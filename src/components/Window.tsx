import { Box } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';

import { Author } from './Author';
import { Delineator } from './Delineator';

type WindowProps = {
  snapName: string;
  snapId: string;
  children: ReactNode;
};

/**
 * A MetaMask-like window, with a snap authorship pill and delineator.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @param props.snapId - The ID of the snap.
 * @param props.children - The children to render inside the delineator.
 * @returns The window component.
 */
export const Window: FunctionComponent<WindowProps> = ({
  snapName,
  snapId,
  children,
}) => (
  <Box boxShadow="lg" maxWidth="360px" maxHeight="672px" paddingY="4">
    <Author snapName={snapName} snapId={snapId} />
    <Box margin="4" marginTop="0">
      <Delineator snapName={snapName}>{children}</Delineator>
    </Box>
    <Box>{/* buttons */}</Box>
  </Box>
);
