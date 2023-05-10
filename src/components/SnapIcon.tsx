import { Avatar, Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { getIcon } from '../features';
import { useSelector } from '../hooks';
import { Icon } from './Icon';

export type SnapIconProps = {
  snapName: string;
};

/**
 * A Snap icon, which renders the icon defined in the snap's manifest, or a
 * fallback icon if the snap doesn't define one.
 *
 * TODO: Actually fetch the snap's icon from the manifest.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @returns The Snap icon component.
 */
export const SnapIcon: FunctionComponent<SnapIconProps> = ({ snapName }) => {
  const snapIcon = useSelector(getIcon);

  return (
    <Box position="relative">
      <Avatar
        src={snapIcon as string}
        name={snapName.slice(1, 2).toUpperCase()}
        fontSize="md"
        background="background.alternative"
        color="text.alternative"
        size="sm"
        margin="1"
      />
      <Icon
        icon="snap"
        width="15px"
        height="15px"
        position="absolute"
        bottom="0px"
        right="0px"
      />
    </Box>
  );
};
