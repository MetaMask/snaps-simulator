import { Heading as ChakraHeading } from '@chakra-ui/react';
import { isComponent } from '@metamask/snaps-ui';
import { assert } from '@metamask/utils';
import { FunctionComponent } from 'react';

export type HeadingProps = {
  node: unknown;
};

export const Heading: FunctionComponent<HeadingProps> = ({ node }) => {
  assert(isComponent(node), 'Expected value to be a valid UI component.');
  assert(node.type === 'heading', 'Expected value to be a heading component.');

  return (
    <ChakraHeading
      fontFamily="custom"
      fontSize="x-large"
      fontWeight="bold"
      paddingBottom="4"
    >
      {node.value}
    </ChakraHeading>
  );
};
