import { IframeExecutionService } from '@metamask/snaps-controllers/dist/services';
import { SnapManifest, SnapRpcHookArgs } from '@metamask/snaps-utils';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  executionService: null as IframeExecutionService | null,
  manifest: null as SnapManifest | null,
  sourceCode: '',
  request: null as SnapRpcHookArgs | null,
  response: null as unknown | null,
};

const slice = createSlice({
  name: 'simulation',
  initialState: INITIAL_STATE,
  reducers: {
    setExecutionService(state, action: PayloadAction<IframeExecutionService>) {
      state.executionService = action.payload;
    },
    setManifest(state, action: PayloadAction<SnapManifest>) {
      state.manifest = action.payload;
    },
    setSourceCode(state, action: PayloadAction<string>) {
      state.sourceCode = action.payload;
    },
    sendRequest(state, action: PayloadAction<SnapRpcHookArgs>) {
      state.request = action.payload;
    },
    captureResponse(state, action: PayloadAction<unknown>) {
      state.response = action.payload;
    },
  },
});

export const {
  setExecutionService,
  setManifest,
  setSourceCode,
  sendRequest,
  captureResponse,
} = slice.actions;
export const simulation = slice.reducer;

export const getExecutionService = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.executionService,
);

export const getChecksum = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (state) => state.manifest?.source.shasum,
);
