import { HandlerType } from '@metamask/snaps-utils';
import { JsonRpcRequest } from '@metamask/utils';
import { createSelector } from '@reduxjs/toolkit';

import { createHandlerSlice } from '../slice';

type Request = {
  origin: string;
  request?: JsonRpcRequest;
};

type Response = string;

const slice = createHandlerSlice<Request, Response>({
  name: HandlerType.OnCronjob,
  initialState: {
    request: {
      origin: '',
    },
    response: '',
    history: [],
  },
});

export const cronjob = slice.reducer;
export const {
  setRequest: setCronjobRequest,
  setResponse: setCronjobResponse,
} = slice.actions;

export const getCronjobRequest = createSelector(
  (state: { cronjob: ReturnType<typeof slice['getInitialState']> }) =>
    state.cronjob,
  (state) => state.request,
);
