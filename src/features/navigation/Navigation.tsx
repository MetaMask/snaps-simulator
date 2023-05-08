import { List, ListItem } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

/**
 * The navigation component, which holds the navigation buttons.
 *
 * @returns The navigation component.
 */
export const Navigation: FunctionComponent = () => (
  <List>
    <ListItem>A</ListItem>
    <ListItem>B</ListItem>
    <ListItem>C</ListItem>
  </List>
);
