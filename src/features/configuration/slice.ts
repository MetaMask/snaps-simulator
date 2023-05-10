import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const DEFAULT_SRP =
  'test test test test test test test test test test test ball';

const INITIAL_STATE = {
  snapUrl: 'http://localhost:8080',
  srp: DEFAULT_SRP,
  sesEnabled: true,
};

const slice = createSlice({
  name: 'configuration',
  initialState: INITIAL_STATE,
  reducers: {
    setSnapUrl(state, action: PayloadAction<string>) {
      state.snapUrl = action.payload;
    },
    setSrp(state, action: PayloadAction<string>) {
      state.srp = action.payload;
    },
    setSesEnabled(state, action: PayloadAction<boolean>) {
      state.sesEnabled = action.payload;
    },
  },
});

export const { setSnapUrl, setSrp, setSesEnabled } = slice.actions;
export const configuration = slice.reducer;

export const getSnapUrl = createSelector(
  (state: { configuration: typeof INITIAL_STATE }) => state.configuration,
  (state) => state.snapUrl,
);

export const getSrp = createSelector(
  (state: { configuration: typeof INITIAL_STATE }) => state.configuration,
  (state) => state.srp,
);

export const getSesEnabled = createSelector(
  (state: { configuration: typeof INITIAL_STATE }) => state.configuration,
  (state) => state.sesEnabled,
);
