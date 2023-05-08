import { ListItem, Stack } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';

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
}) => (
  <ListItem>
    <Link to={path}>
      <Stack direction="row" align="center" justifyContent="space-between">
        <Stack direction="row" align="center">
          <Icon icon={icon} />
          <Stack direction="column" spacing="1">
            {children}
          </Stack>
        </Stack>
        <Icon icon="arrowRight" width="auto" height="12px" paddingX="1" />
      </Stack>
    </Link>
  </ListItem>
);
