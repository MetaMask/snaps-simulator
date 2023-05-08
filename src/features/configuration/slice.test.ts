import {
  configuration as reducer,
  setSesEnabled,
  setSnapUrl,
  setSrp,
} from './slice';

describe('configuration slice', () => {
  describe('setSnapUrl', () => {
    it('sets the snap URL', () => {
      const url = 'http://localhost:9090';
      const result = reducer(
        {
          snapUrl: '',
          srp: '',
          sesEnabled: true,
        },
        setSnapUrl(url),
      );

      expect(result.snapUrl).toStrictEqual(url);
    });
  });

  describe('setSrp', () => {
    it('sets the SRP', () => {
      const srp = 'test test test test test test test test test test test ball';
      const result = reducer(
        {
          snapUrl: '',
          srp: '',
          sesEnabled: true,
        },
        setSrp(srp),
      );

      expect(result.srp).toStrictEqual(srp);
    });
  });

  describe('setSesEnabled', () => {
    it('sets the SES enabled flag', () => {
      const result = reducer(
        {
          snapUrl: '',
          srp: '',
          sesEnabled: true,
        },
        setSesEnabled(false),
      );

      expect(result.sesEnabled).toBe(false);
    });
  });
});
