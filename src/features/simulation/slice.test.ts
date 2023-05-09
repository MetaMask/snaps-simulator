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
} from './slice';
import { MockExecutionService } from './test/mockExecutionService';
import { MOCK_MANIFEST } from './test/mockManifest';

describe('simulation slice', () => {
  describe('setStatus', () => {
    it('sets the snap status', () => {
      const result = reducer(
        {
          status: SnapStatus.Loading,
          executionService: null,
          sourceCode: '',
          manifest: null,
          request: null,
          response: null,
        },
        setStatus(SnapStatus.OK),
      );

      expect(result.status).toStrictEqual(SnapStatus.OK);
    });
  });

  describe('setExecutionService', () => {
    it('sets execution service', () => {
      const executionService =
        new MockExecutionService() as unknown as IframeExecutionService;
      const result = reducer(
        {
          status: SnapStatus.Loading,
          executionService: null,
          sourceCode: '',
          manifest: null,
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
          status: SnapStatus.Loading,
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          manifest: null,
          request: null,
          response: null,
        },
        setSourceCode('foo'),
      );

      expect(result.sourceCode).toBe('foo');
    });
  });

  describe('setManifest', () => {
    it('sets the manifest', () => {
      const result = reducer(
        {
          status: SnapStatus.Loading,
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          manifest: null,
          request: null,
          response: null,
        },
        setManifest(MOCK_MANIFEST),
      );

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
      const result = reducer(
        {
          status: SnapStatus.OK,
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          manifest: null,
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
          status: SnapStatus.OK,
          executionService:
            new MockExecutionService() as unknown as IframeExecutionService,
          sourceCode: '',
          manifest: null,
          request: null,
          response: null,
        },
        captureResponse({ result: 'foo' }),
      );

      expect(result.response).toStrictEqual({ result: 'foo' });
    });
  });
});
