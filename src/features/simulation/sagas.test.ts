import { HandlerType } from '@metamask/snaps-utils';
import { expectSaga } from 'redux-saga-test-plan';

import { DEFAULT_SRP } from '../configuration';
import {
  ALL_APIS,
  DEFAULT_SNAP_ID,
  initSaga,
  rebootSaga,
  requestSaga,
} from './sagas';
import {
  captureResponse,
  sendRequest,
  setExecutionService,
  setSourceCode,
} from './slice';
import { MockExecutionService } from './test/mockExecutionService';

describe('initSaga', () => {
  it('initializes the execution environment', async () => {
    await expectSaga(initSaga)
      .withState({
        configuration: { srp: DEFAULT_SRP },
      })
      .put.actionType(setExecutionService.type)
      .silentRun();
  });
});

describe('rebootSaga', () => {
  it('reboots the execution environment when source code changes', async () => {
    const sourceCode = 'foo';
    const executionService = new MockExecutionService();
    await expectSaga(rebootSaga, setSourceCode(sourceCode))
      .withState({
        simulation: { executionService },
      })
      .call([executionService, 'terminateAllSnaps'])
      .call([executionService, 'executeSnap'], {
        snapId: DEFAULT_SNAP_ID,
        sourceCode,
        endowments: ALL_APIS,
      })
      .silentRun();
  });
});

describe('requestSaga', () => {
  it('sends requests to the execution environment and captures the response', async () => {
    const sourceCode = 'foo';
    const executionService = new MockExecutionService();
    const request = {
      origin: 'Snaps Simulator',
      handler: HandlerType.OnRpcRequest,
      request: {
        jsonrpc: '2.0',
        method: 'bar',
      },
    };
    await expectSaga(requestSaga, sendRequest(request))
      .withState({
        simulation: { sourceCode, executionService },
      })
      .call([executionService, 'handleRpcRequest'], DEFAULT_SNAP_ID, request)
      .put(captureResponse({ result: 'foobar' }))
      .silentRun();
  });
});
