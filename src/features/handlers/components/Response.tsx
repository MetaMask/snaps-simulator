import { Center, Heading, Text } from '@chakra-ui/react';
import { HandlerType } from '@metamask/snaps-utils';
import { assert } from '@metamask/utils';
import { useMatch } from 'react-router-dom';

import { Editor, Icon } from '../../../components';
import { useSelector } from '../../../hooks';

export const Response = () => {
  const match = useMatch('/handler/:handlerId');
  const handlerId = match?.params.handlerId;

  assert(handlerId, 'The handler ID should be defined.');

  const response = useSelector(
    (state) =>
      state[
        handlerId as
          | HandlerType.OnCronjob
          | HandlerType.OnRpcRequest
          | HandlerType.OnTransaction
      ].response,
  );

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
      options={{ readOnly: true }}
    />
  );
};
