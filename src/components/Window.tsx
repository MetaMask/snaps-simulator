import { Flex } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';

import { Author } from './Author';

type WindowProps = {
  snapName: string;
  snapId: string;
  children: ReactNode;
};

/**
 * A MetaMask-like window, with a snap authorship pill.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @param props.snapId - The ID of the snap.
 * @param props.children - The children to render inside the window.
 * @returns The window component.
 */
export const Window: FunctionComponent<WindowProps> = ({
  snapName,
  snapId,
  children,
}) => (
  <Flex
    direction="column"
    boxShadow="lg"
    maxWidth="360px"
    height="600px"
    paddingY="4"
  >
    <Author snapName={snapName} snapId={snapId} />
    {children}
  </Flex>
);
