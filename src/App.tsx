import { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

export const App: FunctionComponent = () => <RouterProvider router={router} />;
