import { LocalLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import { SnapManifest, VirtualFile } from '@metamask/snaps-utils';
import equal from 'fast-deep-equal/es6';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { getSnapUrl, setSnapUrl } from '../configuration';
import { logDefault, logError } from '../console';
import { ManifestStatus, setValid, validateManifest } from '../manifest';
import {
  getSnapManifest,
  setIcon,
  setManifest,
  setSourceCode,
  setStatus,
  SnapStatus,
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
  const manifestJson: VirtualFile<string> = yield call(
    [location, 'fetch'],
    'snap.manifest.json',
  );

  const manifest = JSON.parse(manifestJson.toString('utf8')) as SnapManifest;
  const currentManifest: SnapManifest = yield select(getSnapManifest);
  if (equal(manifest, currentManifest)) {
    return;
  }

  yield put(setValid(ManifestStatus.Unknown));
  yield put(setStatus(SnapStatus.Loading));
  yield put(setManifest(manifest));
  yield put(logDefault('Snap changed, rebooting...'));

  try {
    const bundlePath = manifest.source.location.npm.filePath;
    const bundle: VirtualFile = yield call([location, 'fetch'], bundlePath);
    yield put(setSourceCode(bundle.toString()));

    const { iconPath } = manifest.source.location.npm;
    if (iconPath) {
      const icon: VirtualFile = yield call([location, 'fetch'], iconPath);

      const blob = new Blob([icon.value], { type: 'image/svg+xml' });
      const blobUrl = URL.createObjectURL(blob);
      yield put(setIcon(blobUrl));
    }
  } finally {
    yield put(validateManifest(manifest));
  }
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
    } catch (error: any) {
      console.error(error);
      yield put(logError(error));
      yield put(setStatus(SnapStatus.Error));
      yield put(setValid(ManifestStatus.Unknown));
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
