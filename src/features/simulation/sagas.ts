import { ControllerMessenger } from '@metamask/base-controller';
import { serializeError } from '@metamask/rpc-errors';
import {
  IframeExecutionService,
  setupMultiplex,
} from '@metamask/snaps-controllers';
import { DEFAULT_ENDOWMENTS, SnapRpcHookArgs } from '@metamask/snaps-utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { JsonRpcEngine } from 'json-rpc-engine';
import { createEngineStream } from 'json-rpc-middleware-stream';
import pump from 'pump';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { createMiscMethodMiddleware } from './middleware';
import {
  getExecutionService,
  setExecutionService,
  setSourceCode,
  sendRequest,
  captureResponse,
} from './slice';

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

  /**
   * const permissionController = new PermissionController({
   * messenger: controllerMessenger.getRestricted({
   * name: 'PermissionController',
   * allowedActions: [
   * `ApprovalController:addRequest`,
   * `ApprovalController:hasRequest`,
   * `ApprovalController:acceptRequest`,
   * `ApprovalController:rejectRequest`,
   * `SnapController:getPermitted`,
   * `SnapController:install`,
   * `SubjectMetadataController:getSubjectMetadata`,
   * ],
   * }),
   * });*
   */

  const engine = new JsonRpcEngine();

  engine.push(createMiscMethodMiddleware());

  // TODO: Add PermissionController middleware
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

  yield call([executionService, 'terminateAllSnaps']);
  yield call([executionService, 'executeSnap'], {
    snapId: DEFAULT_SNAP_ID,
    sourceCode: payload,
    endowments: ALL_APIS,
  });
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
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  try {
    const result: unknown = yield call(
      [executionService, 'handleRpcRequest'],
      DEFAULT_SNAP_ID,
      payload,
    );
    yield put(captureResponse({ result }));
  } catch (error) {
    yield put(captureResponse({ error: serializeError(error) }));
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
  ]);
}
