import { LocalLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import { SnapManifest, VirtualFile } from '@metamask/snaps-utils';
import { call, delay, put, all, select, takeLatest } from 'redux-saga/effects';

import { getSnapUrl, setSnapUrl } from '../configuration';
import {
  SnapStatus,
  getChecksum,
  setManifest,
  setSourceCode,
  setStatus,
} from '../simulation';

/**
 * The fetching saga, fetches the snap manifest from the selected snap URL and checks if the checksum matches the cached value.
 * If the checksum doesn't match, it fetches the snap source code and updates that in the simulation slice.
 *
 * @yields Selects the snap URL and checksum, calls fetch to fetch the manifest, puts updates to the manifest and source code.
 */
export function* fetchingSaga() {
  const url: string = yield select(getSnapUrl);

  const location = new LocalLocation(new URL(`local:${url}`));
  const manifest: VirtualFile<SnapManifest> = yield call([
    location,
    'manifest',
  ]);

  const currentChecksum: string = yield select(getChecksum);

  const manifestChecksum = manifest.result.source.shasum;

  if (currentChecksum === manifestChecksum) {
    return;
  }

  yield put(setStatus(SnapStatus.Loading));

  yield put(setManifest(manifest.result));

  const bundlePath = manifest.result.source.location.npm.filePath;

  const bundle: VirtualFile = yield call([location, 'fetch'], bundlePath);

  yield put(setSourceCode(bundle.toString()));
}

/**
 * The polling saga, runs the fetching saga in an infinite loop with a delay.
 *
 * @yields A call to fetchingSaga and a delay.
 */
export function* pollingSaga() {
  while (true) {
    try {
      yield call(fetchingSaga);
      yield delay(500);
    } catch (error) {
      console.error(error);
      yield put(setStatus(SnapStatus.Error));
      break;
    }
  }
}

/**
 * The root polling saga which runs all sagas in this file.
 *
 * @yields All sagas for the polling feature.
 */
export function* rootPollingSaga() {
  yield all([takeLatest(setSnapUrl.type, pollingSaga)]);
}
