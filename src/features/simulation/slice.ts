import { GenericPermissionController } from '@metamask/permission-controller';
import { IframeExecutionService } from '@metamask/snaps-controllers';
import { SnapManifest, SnapRpcHookArgs } from '@metamask/snaps-utils';
import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export enum SnapStatus {
  Ok,
  Loading,
  Error,
}

type SimulationState = {
  status: SnapStatus;
  executionService: IframeExecutionService | null;
  permissionController: GenericPermissionController | null;
  manifest: SnapManifest | null;
  sourceCode: string;
};

export const INITIAL_STATE: SimulationState = {
  status: SnapStatus.Loading,
  executionService: null,
  permissionController: null,
  manifest: null,
  sourceCode: '',
};

const slice = createSlice({
  name: 'simulation',
  initialState: INITIAL_STATE,
  reducers: {
    setStatus(state, action: PayloadAction<SnapStatus>) {
      state.status = action.payload;
    },
    setExecutionService(state, action: PayloadAction<IframeExecutionService>) {
      state.executionService = action.payload;
    },
    setPermissionController(
      state,
      action: PayloadAction<GenericPermissionController>,
    ) {
      state.permissionController = action.payload as any;
    },
    setManifest(state, action: PayloadAction<SnapManifest>) {
      // Type error occurs here due to some weirdness with SnapManifest and WritableDraft or PayloadAction
      state.manifest = action.payload as any;
    },
    setSourceCode(state, action: PayloadAction<string>) {
      state.sourceCode = action.payload;
    },
  },
});

export const sendRequest = createAction<SnapRpcHookArgs>(
  `${slice.name}/sendRequest`,
);

export const {
  setStatus,
  setExecutionService,
  setPermissionController,
  setManifest,
  setSourceCode,
} = slice.actions;

export const simulation = slice.reducer;

export const getStatus = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.status,
);

export const getExecutionService = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.executionService,
);

export const getPermissionController = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.permissionController,
);

export const getChecksum = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.manifest?.source.shasum,
);
