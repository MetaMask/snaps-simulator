import { LocalLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import { SnapManifest, VirtualFile } from '@metamask/snaps-utils';
import { call, delay, put, all, select, takeLatest } from 'redux-saga/effects';

import { getSnapUrl, setSnapUrl } from '../configuration';
import { getChecksum, setManifest, setSourceCode } from '../simulation';

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

  yield put(setManifest(manifest.result));

  const bundlePath = manifest.result.source.location.npm.filePath;

  const bundle: VirtualFile = yield call([location, 'fetch'], bundlePath);

  yield put(setSourceCode(bundle.toString()));
}

export function* pollingSaga() {
  while (true) {
    try {
      yield call(fetchingSaga);
      yield delay(500);
    } catch (error) {
      console.error(error);
      break;
    }
  }
}

export function* rootPollingSaga() {
  yield all([takeLatest(setSnapUrl.type, pollingSaga)]);
}
