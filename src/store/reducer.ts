import { combineReducers } from '@reduxjs/toolkit';

import { overview, simulation, configuration } from '../features';

export const reducer = combineReducers({
  overview,
  configuration,
  simulation,
});
