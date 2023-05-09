import { Center, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Icon } from './Icon';

export type SnapIconProps = {
  snapName: string;
};

/**
 * A Snap icon, which renders the icon defined in the snap's manifest, or a
 * fallback icon if the snap doesn't define one.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @returns The Snap icon component.
 */
export const SnapIcon: FunctionComponent<SnapIconProps> = ({ snapName }) => (
  <Center
    width="32px"
    height="32px"
    borderRadius="100%"
    background="background.alternative"
    position="relative"
    margin="1"
  >
    <Text fontSize="md" color="text.alternative">
      {snapName.slice(1, 2).toUpperCase()}
    </Text>
    <Icon icon="snap" width="15px" position="absolute" top="65%" left="65%" />
  </Center>
);
