import { Center, Heading, Text } from '@chakra-ui/react';

import { Editor, Icon } from '../../../components';
import { useSelector, useHandler } from '../../../hooks';

export const Response = () => {
  const handler = useHandler();
  const response = useSelector((state) => state[handler].response);

  if (!response) {
    return (
      <Center
        background="background.alternative"
        flex="1"
        flexDirection="column"
      >
        <Icon icon="computer" width="34px" height="auto" marginBottom="1.5" />
        <Heading
          as="h3"
          fontSize="sm"
          fontWeight="700"
          color="text.muted"
          marginBottom="1"
        >
          No response yet
        </Heading>
        <Text fontSize="xs" textAlign="center" color="text.muted">
          Create a request via the
          <br />
          left-side config to get started.
        </Text>
      </Center>
    );
  }

  return (
    <Editor
      border="none"
      value={JSON.stringify(response, null, 2)}
      options={{ readOnly: true, wordWrap: 'on' }}
    />
  );
};
