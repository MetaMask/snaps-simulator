import { ControllerMessenger } from '@metamask/base-controller';
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
  DEFAULT_ENDOWMENTS,
  SnapManifest,
  SnapRpcHookArgs,
} from '@metamask/snaps-utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { JsonRpcEngine } from 'json-rpc-engine';
import { createEngineStream } from 'json-rpc-middleware-stream';
import pump from 'pump';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { runSaga } from '../../store/middleware';
import { getSrp } from '../configuration';
import {
  showDialog,
  showInAppNotification,
  showNativeNotification,
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
  processSnapPermissions,
  unrestrictedMethods,
} from './snap-permissions';

// TODO: Use actual snap ID
export const DEFAULT_SNAP_ID = 'simulated-snap';

export const ALL_APIS = [...DEFAULT_ENDOWMENTS, 'fetch', 'WebAssembly'];

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

  // TODO: Add middleware for passing node calls to node

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
export function* rebootSaga({ payload }: PayloadAction<string>) {
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  try {
    yield call([executionService, 'terminateAllSnaps']);
    yield call([executionService, 'executeSnap'], {
      snapId: DEFAULT_SNAP_ID,
      sourceCode: payload,
      endowments: ALL_APIS,
    });
    yield put(setStatus(SnapStatus.Ok));
  } catch (error) {
    console.error(error);
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
export function* permissionsSaga({ payload }: PayloadAction<SnapManifest>) {
  const permissionController: GenericPermissionController = yield select(
    getPermissionController,
  );

  // TODO: Verify these
  const approvedPermissions = processSnapPermissions(
    payload.initialPermissions,
  );

  // Grant all permissions
  yield call([permissionController, 'grantPermissions'], {
    approvedPermissions,
    subject: { origin: DEFAULT_SNAP_ID },
    preserveExistingPermissions: false,
  });
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
