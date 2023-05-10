import {
  jsonRpc as reducer,
  setJsonRpcRequest,
  setJsonRpcResponse,
  INITIAL_STATE,
} from './slice';

describe('jsonRpc', () => {
  describe('setJsonRpcRequest', () => {
    it('sets the request', () => {
      const result = reducer(
        INITIAL_STATE,
        setJsonRpcRequest({ origin: 'foo' }),
      );

      expect(result.request).toStrictEqual({ origin: 'foo' });
    });

    it('pushes the request to history', () => {
      const result = reducer(
        INITIAL_STATE,
        setJsonRpcRequest({ origin: 'foo' }),
      );

      expect(result.history).toStrictEqual([
        { date: expect.any(Date), request: { origin: 'foo' } },
      ]);
    });
  });

  describe('setJsonRpcResponse', () => {
    it('sets the response', () => {
      const result = reducer(INITIAL_STATE, setJsonRpcResponse('foo'));

      expect(result.response).toBe('foo');
    });
  });
});
