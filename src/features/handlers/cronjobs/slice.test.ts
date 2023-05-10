import {
  cronjob as reducer,
  INITIAL_STATE,
  setCronjobRequest,
  setCronjobResponse,
} from './slice';

describe('cronjobs', () => {
  describe('setCronjobRequest', () => {
    it('sets the request', () => {
      const result = reducer(
        INITIAL_STATE,
        setCronjobRequest({ origin: 'foo' }),
      );

      expect(result.request).toStrictEqual({ origin: 'foo' });
    });

    it('pushes the request to history', () => {
      const result = reducer(
        INITIAL_STATE,
        setCronjobRequest({ origin: 'foo' }),
      );

      expect(result.history).toStrictEqual([
        { date: expect.any(Date), request: { origin: 'foo' } },
      ]);
    });
  });

  describe('setCronjobResponse', () => {
    it('sets the response', () => {
      const result = reducer(INITIAL_STATE, setCronjobResponse('foo'));

      expect(result.response).toBe('foo');
    });
  });
});
