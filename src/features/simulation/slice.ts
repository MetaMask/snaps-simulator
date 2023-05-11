import { GenericPermissionController } from '@metamask/permission-controller';
import { DialogType } from '@metamask/rpc-methods/dist/restricted/dialog';
import { IframeExecutionService } from '@metamask/snaps-controllers';
import { Component } from '@metamask/snaps-ui';
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

export type HandlerUserInterface = {
  type: DialogType;
  snapId: string;
  snapName: string;
  node: Component;
};

type SimulationState = {
  status: SnapStatus;
  executionService: IframeExecutionService | null;
  permissionController: GenericPermissionController | null;
  manifest: SnapManifest | null;
  sourceCode: string;
  icon?: string;
  ui?: HandlerUserInterface | null;
  snapState: string | null;
};

export const INITIAL_STATE: SimulationState = {
  status: SnapStatus.Loading,
  executionService: null,
  permissionController: null,
  manifest: null,
  sourceCode: '',
  snapState: null,
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
    setIcon(state, action: PayloadAction<string>) {
      state.icon = action.payload;
    },
    showUserInterface: (state, action: PayloadAction<HandlerUserInterface>) => {
      state.ui = action.payload;
    },
    closeUserInterface: (state) => {
      state.ui = null;
    },
    setSnapState: (state, action: PayloadAction<string | null>) => {
      state.snapState = action.payload;
    },
  },
});

export const sendRequest = createAction<SnapRpcHookArgs>(
  `${slice.name}/sendRequest`,
);

export const resolveUserInterface = createAction<unknown>(
  `${slice.name}/resolveUserInterface`,
);

export const {
  setStatus,
  setExecutionService,
  setPermissionController,
  setManifest,
  setSourceCode,
  setIcon,
  showUserInterface,
  closeUserInterface,
  setSnapState,
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

export const getSnapName = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.manifest?.proposedName,
);

export const getIcon = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.icon,
);

export const getUserInterface = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.ui,
);

export const getSnapStateSelector = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.snapState,
);

export const getSnapManifest = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.manifest,
);

export const getSourceCode = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.sourceCode,
);
