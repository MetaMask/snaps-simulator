import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { Cronjobs, JsonRpc, Layout, Transactions } from './features';
import { Handler } from './features/handlers/components';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path="/"
        element={<Navigate to="/handler/json-rpc" replace={true} />}
      />
      <Route path="/handler" element={<Handler />}>
        <Route path="/handler/json-rpc" element={<JsonRpc />} />
        <Route path="/handler/cronjobs" element={<Cronjobs />} />
        <Route path="/handler/transactions" element={<Transactions />} />
      </Route>
    </Route>,
  ),
);
