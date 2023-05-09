import { Box } from '@chakra-ui/react';
import { isComponent } from '@metamask/snaps-ui';
import { assert } from '@metamask/utils';
import { FunctionComponent } from 'react';

import { Renderer } from '../Renderer';

export type PanelProps = {
  node: unknown;
};

export const Panel: FunctionComponent<PanelProps> = ({ node }) => {
  assert(isComponent(node), 'Expected value to be a valid UI component.');
  assert(node.type === 'panel', 'Expected value to be a panel component.');

  return (
    <Box>
      {node.children.map((child, index) => (
        <Renderer key={`child-${index}`} node={child} />
      ))}
    </Box>
  );
};
