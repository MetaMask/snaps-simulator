import { DialogType } from '@metamask/rpc-methods';
import { Component } from '@metamask/snaps-ui';
import { SagaIterator } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';

import {
  closeUserInterface,
  getSnapName,
  resolveUserInterface,
  showUserInterface,
} from './slice';

/**
 * Show a dialog to the user.
 *
 * @param snapId - The ID of the Snap that created the alert.
 * @param type - The type of dialog to show.
 * @param content - The content to show in the dialog.
 * @param _placeholder - The placeholder text to show in the dialog.
 * @yields Selects the current state.
 * @returns True if the dialog was shown, false otherwise.
 */
export function* showDialog(
  snapId: string,
  type: DialogType,
  content: Component,
  _placeholder?: string,
): SagaIterator {
  const snapName = yield select(getSnapName);

  // TODO: Support placeholder.
  yield put(
    showUserInterface({
      snapId,
      snapName: snapName ?? snapId,
      type,
      node: content,
    }),
  );

  const { payload } = yield take(resolveUserInterface.type);
  yield put(closeUserInterface());

  return payload;
}
