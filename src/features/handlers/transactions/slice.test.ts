import {
  transactions as reducer,
  setTransactionRequest,
  INITIAL_STATE,
  setTransactionResponse,
} from './slice';

describe('transactions', () => {
  describe('setTransactionRequest', () => {
    it('sets the request', () => {
      const result = reducer(
        INITIAL_STATE,
        setTransactionRequest({ origin: 'foo' }),
      );

      expect(result.request).toStrictEqual({ origin: 'foo' });
    });

    it('pushes the request to history', () => {
      const result = reducer(
        INITIAL_STATE,
        setTransactionRequest({ origin: 'foo' }),
      );

      expect(result.history).toStrictEqual([
        { date: expect.any(Date), request: { origin: 'foo' } },
      ]);
    });
  });

  describe('setTransactionResponse', () => {
    it('sets the response', () => {
      const result = reducer(INITIAL_STATE, setTransactionResponse('foo'));

      expect(result.response).toBe('foo');
    });
  });
});
