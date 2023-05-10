import { HandlerType } from '@metamask/snaps-utils';
import { combineReducers } from '@reduxjs/toolkit';

import {
  simulation,
  configuration,
  jsonRpc,
  cronjob,
  transactions,
  notifications,
} from '../features';

export const reducer = combineReducers({
  configuration,
  notifications,
  simulation,
  [HandlerType.OnRpcRequest]: jsonRpc,
  [HandlerType.OnCronjob]: cronjob,
  [HandlerType.OnTransaction]: transactions,
});
