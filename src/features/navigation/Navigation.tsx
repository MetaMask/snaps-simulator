import { Box, Container, List, Stack, Tag, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Icon } from '../../components';
import { useSelector } from '../../hooks';
import { Item, ManifestStatusIndicator } from './components';
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
      <Stack as={List} spacing="4">
        {NAVIGATION_ITEMS.map(
          ({ condition, icon, label, tag, description, path }) => {
            if (condition && !condition(applicationState)) {
              return null;
            }

            return (
              <Item key={path} path={path}>
                <Icon icon={icon} />
                <Box>
                  <Text>
                    <Box as="span" fontWeight="600">
                      {label}
                    </Box>{' '}
                    <Tag variant="code">{tag}</Tag>
                  </Text>
                  <Text fontSize="xs" marginTop="1">
                    {description}
                  </Text>
                </Box>
              </Item>
            );
          },
        )}

        {/* For now we declare this separately, because it has special state. */}
        <Item key="manifest" path="/manifest">
          <Box position="relative">
            <Icon icon="snap" />
            <ManifestStatusIndicator />
          </Box>
          <Box>
            <Text>
              <Box as="span" fontWeight="600">
                Manifest
              </Box>{' '}
              <Tag variant="code">snap.manifest.json</Tag>
            </Text>
            <Text fontSize="xs" marginTop="1">
              Validate the snap manifest
            </Text>
          </Box>
        </Item>
      </Stack>
    </Container>
  );
};
