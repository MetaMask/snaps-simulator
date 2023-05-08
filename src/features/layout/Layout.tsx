import { Box, Stack } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';
import { Sidebar } from './components/Sidebar';

type LayoutProps = {
  children?: ReactNode;
};

/**
 * Render the layout of the application.
 *
 * @returns A React component.
 */
export const Layout: FunctionComponent<LayoutProps> = () => (
  <Box height="100vh">
    <Header />
    <Stack direction="row" height="full">
      <Sidebar />
      {/* Note: Due to the use of `react-router-dom`, we have to use the `Outlet`
        component here, rather than `children`. This renders the current active
        page. */}
      <Outlet />
    </Stack>
  </Box>
);
