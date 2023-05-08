import { Box, ListItem, Stack } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import { useMatch } from 'react-router-dom';

import { Icon, IconName, Link } from '../../../components';

type ItemProps = {
  path: string;
  icon: IconName;
  children: ReactNode;
};

export const Item: FunctionComponent<ItemProps> = ({
  path,
  icon,
  children,
}) => {
  const active = useMatch(path);
  const isActive = Boolean(active);

  return (
    <ListItem>
      <Link
        padding="2"
        variant={isActive ? 'navigation-active' : 'navigation-default'}
        to={path}
        display="block"
        _hover={{
          textDecoration: 'none',
          opacity: 1,
          background: 'background.hover',
        }}
      >
        <Stack direction="row" align="center">
          <Icon icon={icon} />
          <Box>{children}</Box>
        </Stack>
      </Link>
    </ListItem>
  );
};
