import { Container, List, Stack, Tag, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Item } from './components';
import { NAVIGATION_ITEMS } from './items';

/**
 * The navigation component, which holds the navigation buttons.
 *
 * @returns The navigation component.
 */
export const Navigation: FunctionComponent = () => (
  <Container as="nav" size="fullWidth">
    <Stack as={List} marginTop="4" spacing="4">
      {NAVIGATION_ITEMS.map(({ icon, label, tag, path }) => (
        <Item key={path} icon={icon} path={path}>
          <Text>{label}</Text>
          <Tag variant="code">{tag}</Tag>
        </Item>
      ))}
    </Stack>
  </Container>
);
