import { IframeExecutionService } from '@metamask/snaps-controllers';
import { HandlerType } from '@metamask/snaps-utils';

import {
  captureResponse,
  simulation as reducer,
  sendRequest,
  setExecutionService,
  setSourceCode,
} from './slice';
import { MockExecutionService } from './test/mockExecutionService';

describe('simulation slice', () => {
  describe('setExecutionService', () => {
    it('sets execution service', () => {
      const executionService =
        new MockExecutionService() as unknown as IframeExecutionService;
      const result = reducer(
        {
          executionService: null,
          sourceCode: '',
          request: null,
          response: null,
        },
        setExecutionService(executionService),
      );

      expect(result.executionService).toStrictEqual(executionService);
    });
  });

  describe('setSourceCode', () => {
    it('sets the source code', () => {
      const result = reducer(
        {
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          request: null,
          response: null,
        },
        setSourceCode('foo'),
      );

      expect(result.sourceCode).toBe('foo');
    });
  });

  describe('sendRequest', () => {
    it('sets the request', () => {
      const request = {
        origin: 'Snaps Simulator',
        handler: HandlerType.OnRpcRequest,
        request: { jsonrpc: '2.0', method: 'foo', params: [] },
      };
      const result = reducer(
        {
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          request: null,
          response: null,
        },
        sendRequest(request),
      );

      expect(result.request).toStrictEqual(request);
    });
  });

  describe('captureResponse', () => {
    it('sets the response', () => {
      const result = reducer(
        {
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          request: null,
          response: null,
        },
        captureResponse({ result: 'foo' }),
      );

      expect(result.response).toStrictEqual({ result: 'foo' });
    });
  });
});
