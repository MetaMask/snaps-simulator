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
  name: HandlerType.OnRpcRequest,
  initialState: {
    request: {
      origin: '',
    },
    response: '',
    history: [],
  },
});

export const jsonRpc = slice.reducer;
export const {
  setRequest: setJsonRpcRequest,
  setResponse: setJsonRpcResponse,
} = slice.actions;

export const getJsonRpcRequest = createSelector(
  (state: { jsonRpc: ReturnType<typeof slice['getInitialState']> }) =>
    state.jsonRpc,
  (state) => state.request,
);
