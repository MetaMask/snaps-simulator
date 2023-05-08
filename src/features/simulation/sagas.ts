import { ControllerMessenger } from '@metamask/base-controller';
import {
  IframeExecutionService,
  setupMultiplex,
} from '@metamask/snaps-controllers/dist/services';
import { HandlerType, SnapRpcHookArgs } from '@metamask/snaps-utils';
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

/**
 * The initialization saga is run on page load and initializes the snaps execution environment.
 * This saga also creates the JSON-RPC engine and middlewares used to process RPC requests from the executing snap.
 *
 * @yields Puts the execution environment after creation.
 */
function* initSaga() {
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

  // TODO: Remove
  yield put(
    setSourceCode(
      'module.exports.onRpcRequest = () => { return "bar returned from snap"; }',
    ),
  );
}

/**
 * The reboot saga, which should run when the setSourceCode action is emitted.
 * This saga will terminate existing snaps and reboot the snap with the latest source code.
 *
 * @param action - The action itself.
 * @param action.payload - The payload of the action, in this case the source code.
 * @yields Select for selecting the execution service and call to call the execution service.
 */
function* rebootSaga({ payload }: PayloadAction<string>) {
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  yield call([executionService, 'terminateAllSnaps']);
  yield call([executionService, 'executeSnap'], {
    snapId: 'foo',
    sourceCode: payload,
  });

  // TODO: Remove
  yield put(
    sendRequest({
      origin: 'Snaps Simulator',
      handler: HandlerType.OnRpcRequest,
      request: {
        jsonrpc: '2.0',
        method: 'foo',
      },
    }),
  );
}

/**
 * The request saga, which should run when the sendRequest action is emitted.
 * This saga will send an RPC request to the snap and capture the response.
 *
 * @param action - The action itself.
 * @param action.payload - The payload of the action, in this case the RPC request.
 * @yields Select for selecting the execution service, call to call the execution service and put for storing the response.
 */
function* requestSaga({ payload }: PayloadAction<SnapRpcHookArgs>) {
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  const response: unknown = yield call(
    [executionService, 'handleRpcRequest'],
    'foo',
    payload,
  );

  yield put(captureResponse(response));
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
