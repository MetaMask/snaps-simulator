import { Box, Container, List, Stack, Tag, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { useSelector } from '../../hooks';
import { Item } from './components';
import { NAVIGATION_ITEMS } from './items';

/**
 * The navigation component, which holds the navigation buttons.
 *
 * @returns The navigation component.
 */
export const Navigation: FunctionComponent = () => {
  const applicationState = useSelector((state) => state);

  return (
    <Container as="nav" size="fullWidth">
      <Stack as={List} marginTop="4" spacing="4">
        {NAVIGATION_ITEMS.map(
          ({ condition, icon, label, tag, description, path }) => {
            if (condition && !condition(applicationState)) {
              return null;
            }

            return (
              <Item key={path} icon={icon} path={path}>
                <Text>
                  <Box as="span" fontWeight="600">
                    {label}
                  </Box>{' '}
                  <Tag variant="code">{tag}</Tag>
                </Text>
                <Text fontSize="sm" marginTop="1">
                  {description}
                </Text>
              </Item>
            );
          },
        )}
      </Stack>
    </Container>
  );
};
