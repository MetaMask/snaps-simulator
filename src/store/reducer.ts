import { HandlerType } from '@metamask/snaps-utils';
import { combineReducers } from '@reduxjs/toolkit';

import {
  simulation,
  configuration,
  jsonRpc,
  cronjob,
  transactions,
  notifications,
  console,
} from '../features';

export const reducer = combineReducers({
  configuration,
  console,
  notifications,
  simulation,
  [HandlerType.OnRpcRequest]: jsonRpc,
  [HandlerType.OnCronjob]: cronjob,
  [HandlerType.OnTransaction]: transactions,
});
