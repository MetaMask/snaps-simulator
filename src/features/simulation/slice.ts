import { IframeExecutionService } from '@metamask/snaps-controllers/dist/services';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  executionService: null as IframeExecutionService | null,
  sourceCode: '',
};

const slice = createSlice({
  name: 'simulation',
  initialState: INITIAL_STATE,
  reducers: {
    setExecutionService(state, action: PayloadAction<IframeExecutionService>) {
      state.executionService = action.payload;
    },
    setSourceCode(state, action: PayloadAction<string>) {
      state.sourceCode = action.payload;
    },
  },
});

export const { setExecutionService, setSourceCode } = slice.actions;
export const simulation = slice.reducer;

export const getExecutionService = createSelector(
  (state: { simulation: typeof INITIAL_STATE }) => state.simulation,
  (simulation) => simulation.executionService,
);
