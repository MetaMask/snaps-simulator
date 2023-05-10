import {
  transactions as reducer,
  setTransactionRequest,
  INITIAL_STATE,
  setTransactionResponse,
  setTransactionRequestFromHistory,
} from './slice';

describe('transactions', () => {
  describe('setTransactionRequest', () => {
    it('sets the request', () => {
      const result = reducer(
        INITIAL_STATE,
        setTransactionRequest({ chainId: 'bar', transaction: 'foo' }),
      );

      expect(result.request).toStrictEqual({ origin: 'foo' });
    });

    it('pushes the request to history', () => {
      const result = reducer(
        INITIAL_STATE,
        setTransactionRequest({ chainId: 'bar', transaction: 'foo' }),
      );

      expect(result.history).toStrictEqual([
        { date: expect.any(Date), request: { origin: 'foo' } },
      ]);
    });
  });

  describe('setTransactionRequestFromHistory', () => {
    it('sets the request', () => {
      const result = reducer(
        INITIAL_STATE,
        setTransactionRequestFromHistory({
          chainId: 'bar',
          transaction: 'foo',
        }),
      );

      expect(result.request).toStrictEqual({ origin: 'foo' });
    });

    it('does not push to history', () => {
      const result = reducer(
        INITIAL_STATE,
        setTransactionRequestFromHistory({
          chainId: 'bar',
          transaction: 'foo',
        }),
      );

      expect(result.history).toStrictEqual([]);
    });
  });

  describe('setTransactionResponse', () => {
    it('sets the response', () => {
      const result = reducer(INITIAL_STATE, setTransactionResponse('foo'));

      expect(result.response).toBe('foo');
    });
  });
});
