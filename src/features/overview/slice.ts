import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  foo: 'bar',
};

const slice = createSlice({
  name: 'overview',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Set `foo`.
     *
     * @param state - The current state.
     * @param action - The action object. The payload is the new `foo` value.
     */
    setFoo(state, action: PayloadAction<string>) {
      state.foo = action.payload;
    },
  },
});

export const { setFoo } = slice.actions;
export const overview = slice.reducer;
