import { takeEvery, delay } from 'redux-saga/effects';

import { setFoo } from './slice';

/**
 * Foo saga, which runs when the {@link setFoo} action is dispatched.
 *
 * @yields A delay of 100ms, then logs a message to the console.
 */
function* fooSaga() {
  yield delay(100);
  console.log('`setFoo` was dispatched!');
}

/**
 * Root saga for the overview feature.
 *
 * @yields All sagas for the overview feature.
 */
export function* overviewSaga() {
  yield takeEvery(setFoo, fooSaga);
}
