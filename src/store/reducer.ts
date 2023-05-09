import { combineReducers } from '@reduxjs/toolkit';

import { simulation, configuration, jsonRpc, cronjob } from '../features';

export const reducer = combineReducers({
  configuration,
  simulation,
  jsonRpc,
  cronjob,
});
