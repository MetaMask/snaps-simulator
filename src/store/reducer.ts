import { combineReducers } from '@reduxjs/toolkit';

import { simulation, configuration } from '../features';

export const reducer = combineReducers({
  configuration,
  simulation,
});
