import { DialogType } from '@metamask/rpc-methods';
import { text } from '@metamask/snaps-ui';
import { expectSaga } from 'redux-saga-test-plan';

import { showDialog } from './hooks';
import { DEFAULT_SNAP_ID } from './sagas';
import {
  closeUserInterface,
  getSnapName,
  resolveUserInterface,
  showUserInterface,
} from './slice';
import { MOCK_MANIFEST } from './test/mockManifest';

describe('showDialog', () => {
  it('shows a dialog', async () => {
    await expectSaga(showDialog, DEFAULT_SNAP_ID, DialogType.Alert, text('foo'))
      .withState({
        simulation: {
          manifest: MOCK_MANIFEST,
        },
      })
      .select(getSnapName)
      .put(
        showUserInterface({
          snapId: DEFAULT_SNAP_ID,
          snapName: '@metamask/example-snap',
          type: DialogType.Alert,
          node: text('foo'),
        }),
      )
      .dispatch(resolveUserInterface('foo'))
      .put(closeUserInterface())
      .returns('foo')
      .silentRun();
  });
});
