import { ControllerMessenger } from '@metamask/base-controller';
import { createFetchMiddleware } from '@metamask/eth-json-rpc-middleware/dist/fetch';
import { mnemonicPhraseToBytes } from '@metamask/key-tree/dist/utils';
import {
  GenericPermissionController,
  PermissionController,
} from '@metamask/permission-controller';
import { serializeError } from '@metamask/rpc-errors';
import { caveatSpecifications as snapsCaveatsSpecifications } from '@metamask/rpc-methods';
import {
  IframeExecutionService,
  setupMultiplex,
  endowmentCaveatSpecifications as snapsEndowmentCaveatSpecifications,
} from '@metamask/snaps-controllers';
import {
  SnapManifest,
  SnapRpcHookArgs,
  VirtualFile,
} from '@metamask/snaps-utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { JsonRpcEngine } from 'json-rpc-engine';
import { createEngineStream } from 'json-rpc-middleware-stream';
import pump from 'pump';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { runSaga } from '../../store/middleware';
import { getSrp } from '../configuration';
import { logError } from '../console';
import { ManifestStatus, setValid } from '../manifest';
import {
  getSnapState,
  showDialog,
  showInAppNotification,
  showNativeNotification,
  updateSnapState,
} from './hooks';
import { createMiscMethodMiddleware } from './middleware';
import {
  getExecutionService,
  setExecutionService,
  setSourceCode,
  sendRequest,
  SnapStatus,
  setStatus,
  getPermissionController,
  setManifest,
  setPermissionController,
} from './slice';
import {
  buildSnapEndowmentSpecifications,
  buildSnapRestrictedMethodSpecifications,
  getEndowments,
  processSnapPermissions,
  unrestrictedMethods,
} from './snap-permissions';

// TODO: Use actual snap ID
export const DEFAULT_SNAP_ID = 'simulated-snap';

/**
 * The initialization saga is run on page load and initializes the snaps execution environment.
 * This saga also creates the JSON-RPC engine and middlewares used to process RPC requests from the executing snap.
 *
 * @yields Puts the execution environment after creation.
 */
export function* initSaga() {
  const controllerMessenger = new ControllerMessenger();

  const srp: string = yield select(getSrp);

  const permissionSpecifications = {
    ...buildSnapEndowmentSpecifications(),
    ...buildSnapRestrictedMethodSpecifications({
      // TODO: Add all the hooks required
      getUnlockPromise: async () => Promise.resolve(true),
      getMnemonic: async () => mnemonicPhraseToBytes(srp),
      showDialog: async (...args: Parameters<typeof showDialog>) =>
        await runSaga(showDialog, ...args).toPromise(),
      showNativeNotification: async (
        ...args: Parameters<typeof showNativeNotification>
      ) => await runSaga(showNativeNotification, ...args).toPromise(),
      showInAppNotification: async (
        ...args: Parameters<typeof showInAppNotification>
      ) => await runSaga(showInAppNotification, ...args).toPromise(),
      getSnapState: async (...args: Parameters<typeof getSnapState>) =>
        await runSaga(getSnapState, ...args).toPromise(),
      updateSnapState: async (...args: Parameters<typeof updateSnapState>) =>
        await runSaga(updateSnapState, ...args).toPromise(),
      clearSnapState: async (...args: Parameters<typeof updateSnapState>) =>
        await runSaga(updateSnapState, args[0], null).toPromise(),
    }),
  };

  const permissionController = new PermissionController({
    messenger: controllerMessenger.getRestricted({
      name: 'PermissionController',
      allowedActions: [
        `ApprovalController:addRequest`,
        `ApprovalController:hasRequest`,
        `ApprovalController:acceptRequest`,
        `ApprovalController:rejectRequest`,
        `SnapController:getPermitted`,
        `SnapController:install`,
        `SubjectMetadataController:getSubjectMetadata`,
      ] as any,
    }),
    caveatSpecifications: {
      ...snapsCaveatsSpecifications,
      ...snapsEndowmentCaveatSpecifications,
    },
    permissionSpecifications,
    // @ts-expect-error PermissionController expects a mutable string array here, but is not given it in the extension either.
    unrestrictedMethods,
  });

  const engine = new JsonRpcEngine();

  engine.push(createMiscMethodMiddleware());

  engine.push(
    permissionController.createPermissionMiddleware({
      origin: DEFAULT_SNAP_ID,
    }),
  );

  engine.push(
    createFetchMiddleware({
      btoa: globalThis.btoa,
      fetch: globalThis.fetch,
      // TODO: Use something else?
      rpcUrl: 'https://cloudflare-eth.com',
    }),
  );

  const executionService = new IframeExecutionService({
    iframeUrl: new URL('https://execution.metamask.io/0.15.1/index.html'),
    messenger: controllerMessenger.getRestricted({
      name: 'ExecutionService',
    }),
    setupSnapProvider: (_snapId, rpcStream) => {
      const mux = setupMultiplex(rpcStream, 'snapStream');
      const stream = mux.createStream(
        'metamask-provider',
      ) as unknown as pump.Stream;
      const providerStream = createEngineStream({ engine });
      pump(stream, providerStream, stream);
    },
  });

  yield put(setExecutionService(executionService));
  yield put(setPermissionController(permissionController));
}

/**
 * The reboot saga, which should run when the setSourceCode action is emitted.
 * This saga will terminate existing snaps and reboot the snap with the latest source code.
 *
 * @param action - The action itself.
 * @param action.payload - The payload of the action, in this case the source code.
 * @yields Select for selecting the execution service and call to call the execution service.
 */
export function* rebootSaga({ payload }: PayloadAction<VirtualFile<string>>) {
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  const permissionController: GenericPermissionController = yield select(
    getPermissionController,
  );

  const endowments: string[] = yield call(
    getEndowments,
    permissionController,
    DEFAULT_SNAP_ID,
  );

  try {
    yield call([executionService, 'terminateAllSnaps']);
    yield call([executionService, 'executeSnap'], {
      snapId: DEFAULT_SNAP_ID,
      sourceCode: payload.toString('utf8'),
      endowments,
    });
    yield put(setStatus(SnapStatus.Ok));
  } catch (error: any) {
    console.error(error);
    yield put(logError(error));
    yield put(setStatus(SnapStatus.Error));
  }
}

/**
 * The request saga, which should run when the sendRequest action is emitted.
 * This saga will send an RPC request to the snap and capture the response.
 *
 * @param action - The action itself.
 * @param action.payload - The payload of the action, in this case the RPC request.
 * @yields Select for selecting the execution service, call to call the execution service and put for storing the response.
 */
export function* requestSaga({ payload }: PayloadAction<SnapRpcHookArgs>) {
  yield put({ type: `${payload.handler}/setRequest`, payload });
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  try {
    const result: unknown = yield call(
      [executionService, 'handleRpcRequest'],
      DEFAULT_SNAP_ID,
      payload,
    );

    yield put({
      type: `${payload.handler}/setResponse`,
      payload: {
        result,
      },
    });
  } catch (error) {
    yield put({
      type: `${payload.handler}/setResponse`,
      payload: { error: serializeError(error) },
    });
  }
}

/**
 * The permissions saga, which should run when the setManifest action is emitted.
 * This saga will automatically grant the active snap all permissions defined in the snap manifest.
 *
 * @param action - The action itself.
 * @param action.payload - The payload of the action, in this case a snap manifest.
 * @yields Selects the permission controller
 */
export function* permissionsSaga({
  payload,
}: PayloadAction<VirtualFile<SnapManifest>>) {
  try {
    const permissionController: GenericPermissionController = yield select(
      getPermissionController,
    );

    // TODO: Verify these
    // Payload is frozen for unknown reasons, this breaks our superstruct validation.
    // To circumvent we stringify and parse.
    const approvedPermissions = processSnapPermissions(
      JSON.parse(JSON.stringify(payload.result.initialPermissions)),
    );

    // Grant all permissions
    yield call([permissionController, 'grantPermissions'], {
      approvedPermissions,
      subject: { origin: DEFAULT_SNAP_ID },
      preserveExistingPermissions: false,
    });
  } catch (error: any) {
    console.error(error);
    yield put(logError(error));
    yield put(setStatus(SnapStatus.Error));
    yield put(setValid(ManifestStatus.Unknown));
  }
}

/**
 * The root simulation saga which runs all sagas in this file.
 *
 * @yields All sagas for the simulation feature.
 */
export function* simulationSaga() {
  yield all([
    initSaga(),
    takeLatest(setSourceCode.type, rebootSaga),
    takeLatest(sendRequest.type, requestSaga),
    takeLatest(setManifest, permissionsSaga),
  ]);
}
