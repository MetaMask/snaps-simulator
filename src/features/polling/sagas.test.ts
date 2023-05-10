import fetchMock from 'jest-fetch-mock';
import { expectSaga } from 'redux-saga-test-plan';

import { setIcon, setManifest, setSourceCode } from '../simulation';
import { MOCK_MANIFEST } from '../simulation/test/mockManifest';
import { MOCK_SNAP_SOURCE } from '../simulation/test/mockSnap';
import { fetchingSaga, pollingSaga } from './sagas';

fetchMock.enableMocks();

describe('pollingSaga', () => {
  it('calls the fetching saga and delay', async () => {
    await expectSaga(pollingSaga)
      .withState({})
      .call(fetchingSaga)
      .delay(500)
      .silentRun();
  });
});

describe('fetchingSaga', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches the snap and updates manifest and source code', async () => {
    // eslint-disable-next-line jest/prefer-spy-on
    globalThis.URL.createObjectURL = jest
      .fn()
      .mockImplementation(() => 'blob:foo');

    fetchMock.mockResponses(JSON.stringify(MOCK_MANIFEST), MOCK_SNAP_SOURCE);
    await expectSaga(fetchingSaga)
      .withState({
        configuration: {
          snapUrl: 'http://localhost:8080',
        },
        simulation: {
          manifest: null,
        },
      })
      .put(setManifest(MOCK_MANIFEST))
      .put(setSourceCode(MOCK_SNAP_SOURCE))
      .put(setIcon('blob:foo'))
      .silentRun();
  });

  it('doesnt update the source code if checksum matches cached checksum', async () => {
    fetchMock.mockResponses(JSON.stringify(MOCK_MANIFEST));
    await expectSaga(fetchingSaga)
      .withState({
        configuration: {
          snapUrl: 'http://localhost:8080',
        },
        simulation: {
          manifest: MOCK_MANIFEST,
        },
      })
      .not.put(setManifest(MOCK_MANIFEST))
      .not.put(setSourceCode(MOCK_SNAP_SOURCE))
      .silentRun();
  });
});
