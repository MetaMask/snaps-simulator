import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Overview } from './features';
import { Layout } from './features/layout';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Overview />} />
    </Route>,
  ),
);
