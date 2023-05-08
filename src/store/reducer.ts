import { combineReducers } from '@reduxjs/toolkit';

import { overview, simulation } from '../features';

export const reducer = combineReducers({
  overview,
  simulation,
});
