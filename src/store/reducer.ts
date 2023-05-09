import { HandlerType } from '@metamask/snaps-utils';
import { combineReducers } from '@reduxjs/toolkit';

import {
  simulation,
  configuration,
  jsonRpc,
  cronjob,
  transactions,
} from '../features';

export const reducer = combineReducers({
  configuration,
  simulation,
  [HandlerType.OnRpcRequest]: jsonRpc,
  [HandlerType.OnCronjob]: cronjob,
  [HandlerType.OnTransaction]: transactions,
});
