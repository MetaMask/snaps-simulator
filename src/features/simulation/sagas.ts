import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getExecutionService,
  setExecutionService,
  setSourceCode,
  sendRequest,
  captureResponse,
} from './slice';
import { JsonRpcEngine } from 'json-rpc-engine';
import {
  IframeExecutionService,
  setupMultiplex,
} from '@metamask/snaps-controllers/dist/services';
import { PermissionController } from '@metamask/permission-controller';
import { ControllerMessenger } from '@metamask/base-controller';
import { createEngineStream } from 'json-rpc-middleware-stream';
import pump from 'pump';
import { PayloadAction } from '@reduxjs/toolkit';
import { createMiscMethodMiddleware } from './middleware';
import { HandlerType, SnapRpcHookArgs } from '@metamask/snaps-utils';

function* initSaga() {
  console.log('INIT');

  const controllerMessenger = new ControllerMessenger();

  /**const permissionController = new PermissionController({
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
      ],
    }),
  });**/

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

function* requestSaga({ payload }: PayloadAction<SnapRpcHookArgs>) {
  const executionService: IframeExecutionService = yield select(
    getExecutionService,
  );

  const response: unknown = yield call(
    [executionService, 'handleRpcRequest'],
    'foo',
    payload,
  );

  console.log(response);

  yield put(captureResponse(response));
}

export function* simulationSaga() {
  yield all([
    initSaga(),
    takeLatest(setSourceCode.type, rebootSaga),
    takeLatest(sendRequest.type, requestSaga),
  ]);
}
