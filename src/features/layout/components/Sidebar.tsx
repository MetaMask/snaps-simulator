import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Navigation } from '../../navigation';

/**
 * The sidebar component, which holds the navigation buttons, etc.
 *
 * @returns The sidebar component.
 */
export const Sidebar: FunctionComponent = () => (
  <Box width="375px" borderRight="muted">
    <Navigation />
  </Box>
);
