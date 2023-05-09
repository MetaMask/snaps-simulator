import { Text as ChakraText } from '@chakra-ui/react';
import { isComponent } from '@metamask/snaps-ui';
import { assert } from '@metamask/utils';
import { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

export type TextProps = {
  node: unknown;
};

export const Text: FunctionComponent<TextProps> = ({ node }) => {
  assert(isComponent(node), 'Expected value to be a valid UI component.');
  assert(node.type === 'text', 'Expected value to be a text component.');

  return (
    <ReactMarkdown
      allowedElements={['p', 'strong', 'em']}
      components={{
        p: ({ children: value }) => (
          <ChakraText fontFamily="custom" fontSize="sm" paddingBottom="1">
            {value}
          </ChakraText>
        ),
      }}
    >
      {node.value}
    </ReactMarkdown>
  );
};
