import { GenericPermissionController } from '@metamask/permission-controller';
import { DialogType } from '@metamask/rpc-methods';
import { text } from '@metamask/snaps-ui';
import { HandlerType } from '@metamask/snaps-utils';
import { expectSaga } from 'redux-saga-test-plan';

import { DEFAULT_SRP } from '../configuration';
import {
  ALL_APIS,
  DEFAULT_SNAP_ID,
  initSaga,
  permissionsSaga,
  rebootSaga,
  requestSaga,
  showDialog,
} from './sagas';
import {
  closeUserInterface,
  getSnapName,
  resolveUserInterface,
  sendRequest,
  setExecutionService,
  setManifest,
  setSourceCode,
  showUserInterface,
} from './slice';
import { processSnapPermissions } from './snap-permissions';
import { MockExecutionService } from './test/mockExecutionService';
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

describe('initSaga', () => {
  it('initializes the execution environment', async () => {
    await expectSaga(initSaga)
      .withState({
        configuration: { srp: DEFAULT_SRP },
      })
      .put.actionType(setExecutionService.type)
      .silentRun();
  });
});

describe('rebootSaga', () => {
  it('reboots the execution environment when source code changes', async () => {
    const sourceCode = 'foo';
    const executionService = new MockExecutionService();
    await expectSaga(rebootSaga, setSourceCode(sourceCode))
      .withState({
        simulation: { executionService },
      })
      .call([executionService, 'terminateAllSnaps'])
      .call([executionService, 'executeSnap'], {
        snapId: DEFAULT_SNAP_ID,
        sourceCode,
        endowments: ALL_APIS,
      })
      .silentRun();
  });
});

describe('requestSaga', () => {
  it('sends requests to the execution environment and captures the response', async () => {
    const sourceCode = 'foo';
    const executionService = new MockExecutionService();
    const request = {
      origin: 'Snaps Simulator',
      handler: HandlerType.OnRpcRequest,
      request: {
        jsonrpc: '2.0',
        method: 'bar',
      },
    };
    await expectSaga(requestSaga, sendRequest(request))
      .withState({
        simulation: { sourceCode, executionService },
      })
      .put({
        type: `${HandlerType.OnRpcRequest}/setRequest`,
        payload: request,
      })
      .call([executionService, 'handleRpcRequest'], DEFAULT_SNAP_ID, request)
      .put({
        type: `${HandlerType.OnRpcRequest}/setResponse`,
        payload: {
          result: 'foobar',
        },
      })
      .silentRun();
  });
});

describe('permissionsSaga', () => {
  it('grants permissions based on the manifest payload', async () => {
    const grantPermissions = jest.fn();
    const permissionController = {
      grantPermissions,
    } as unknown as GenericPermissionController;
    const approvedPermissions = processSnapPermissions(
      MOCK_MANIFEST.initialPermissions,
    );
    await expectSaga(permissionsSaga, setManifest(MOCK_MANIFEST))
      .withState({
        simulation: { permissionController },
      })
      .call([permissionController, 'grantPermissions'], {
        approvedPermissions,
        subject: { origin: DEFAULT_SNAP_ID },
        preserveExistingPermissions: false,
      })
      .silentRun();
  });
});
