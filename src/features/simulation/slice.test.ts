import { IframeExecutionService } from '@metamask/snaps-controllers';

import {
  SnapStatus,
  simulation as reducer,
  setExecutionService,
  setManifest,
  setSourceCode,
  setStatus,
  INITIAL_STATE,
} from './slice';
import { MockExecutionService } from './test/mockExecutionService';
import { MOCK_MANIFEST } from './test/mockManifest';

describe('simulation slice', () => {
  describe('setStatus', () => {
    it('sets the snap status', () => {
      const result = reducer(INITIAL_STATE, setStatus(SnapStatus.Ok));

      expect(result.status).toStrictEqual(SnapStatus.Ok);
    });
  });

  describe('setExecutionService', () => {
    it('sets execution service', () => {
      const executionService =
        new MockExecutionService() as unknown as IframeExecutionService;
      const result = reducer(
        INITIAL_STATE,
        setExecutionService(executionService),
      );

      expect(result.executionService).toStrictEqual(executionService);
    });
  });

  describe('setSourceCode', () => {
    it('sets the source code', () => {
      const result = reducer(INITIAL_STATE, setSourceCode('foo'));

      expect(result.sourceCode).toBe('foo');
    });
  });

  describe('setManifest', () => {
    it('sets the manifest', () => {
      const result = reducer(INITIAL_STATE, setManifest(MOCK_MANIFEST));

      expect(result.manifest).toBe(MOCK_MANIFEST);
    });
  });
});
