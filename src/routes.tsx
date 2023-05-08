import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Cronjobs, JsonRpc, Layout, Transactions } from './features';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<JsonRpc />} />
      <Route path="/cronjobs" element={<Cronjobs />} />
      <Route path="/transactions" element={<Transactions />} />
    </Route>,
  ),
);
