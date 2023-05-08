import { Box } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

type LayoutProps = {
  children?: ReactNode;
};

/**
 * Render the layout of the application.
 *
 * @returns A React component.
 */
export const Layout: FunctionComponent<LayoutProps> = () => (
  <Box>
    {/* Note: Due to the use of `react-router-dom`, we have to use the `Outlet`
        component here, rather than `children`. This renders the current active
        page. */}
    <Outlet />
  </Box>
);
