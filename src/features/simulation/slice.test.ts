import { IframeExecutionService } from '@metamask/snaps-controllers';
import { HandlerType } from '@metamask/snaps-utils';

import {
  SnapStatus,
  captureResponse,
  simulation as reducer,
  sendRequest,
  setExecutionService,
  setManifest,
  setSourceCode,
  setStatus,
  INITIAL_STATE,
} from './slice';
import { MockExecutionService } from './test/mockExecutionService';
import { MOCK_MANIFEST } from './test/mockManifest';

describe('simulation slice', () => {
  describe('setStatus', () => {
    it('sets the snap status', () => {
      const result = reducer(INITIAL_STATE, setStatus(SnapStatus.Ok));

      expect(result.status).toStrictEqual(SnapStatus.Ok);
    });
  });

  describe('setExecutionService', () => {
    it('sets execution service', () => {
      const executionService =
        new MockExecutionService() as unknown as IframeExecutionService;
      const result = reducer(
        INITIAL_STATE,
        setExecutionService(executionService),
      );

      expect(result.executionService).toStrictEqual(executionService);
    });
  });

  describe('setSourceCode', () => {
    it('sets the source code', () => {
      const result = reducer(INITIAL_STATE, setSourceCode('foo'));

      expect(result.sourceCode).toBe('foo');
    });
  });

  describe('setManifest', () => {
    it('sets the manifest', () => {
      const result = reducer(INITIAL_STATE, setManifest(MOCK_MANIFEST));

      expect(result.manifest).toBe(MOCK_MANIFEST);
    });
  });

  describe('sendRequest', () => {
    it('sets the request', () => {
      const request = {
        origin: 'Snaps Simulator',
        handler: HandlerType.OnRpcRequest,
        request: { jsonrpc: '2.0', method: 'foo', params: [] },
      };
      const result = reducer(INITIAL_STATE, sendRequest(request));

      expect(result.request).toStrictEqual(request);
    });
  });

  describe('captureResponse', () => {
    it('sets the response', () => {
      const result = reducer(INITIAL_STATE, captureResponse({ result: 'foo' }));

      expect(result.response).toStrictEqual({ result: 'foo' });
    });
  });
});
