import { call, delay, put, race, select } from 'redux-saga/effects';
import { getSnapUrl } from '../configuration';
import { LocalLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import { SnapManifest, VirtualFile } from '@metamask/snaps-utils';
import {
  getChecksum,
  setManifest,
  setSourceCode,
} from '../simulation';

export function* fetchingSaga() {
  const url: string = yield select(getSnapUrl);

  const location = new LocalLocation(new URL(`local:${url}`));
  const manifest: VirtualFile<SnapManifest> = yield call([
    location,
    'manifest',
  ]);

  const checksum: string = yield select(getChecksum);

  const manifestChecksum = manifest.result.source.shasum;

  if (checksum === manifestChecksum) {
    return;
  }

  yield put(setManifest(manifest.result));

  console.log('Snap changed!');

  const bundlePath = manifest.result.source.location.npm.filePath;

  const bundle: VirtualFile<unknown> = yield call(
    [location, 'fetch'],
    bundlePath,
  );

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
  yield race([pollingSaga()]);
}
