import { SnapManifest } from '@metamask/snaps-utils';
import { expectSaga } from 'redux-saga-test-plan';

import { validationSaga } from './sagas';
import {
  ManifestStatus,
  setResults,
  setValid,
  validateManifest,
} from './slice';

describe('validationSaga', () => {
  it('validates the manifest', async () => {
    await expectSaga(validationSaga, validateManifest({} as SnapManifest))
      .withState({
        simulation: {
          sourceCode: 'source code',
          icon: 'icon',
        },
      })
      .call.like({
        args: [
          {},
          {
            sourceCode: 'source code',
            icon: 'icon',
          },
        ],
      })
      .put.actionType(setResults.type)
      .put(setValid(ManifestStatus.Invalid))
      .silentRun();
  });
});
