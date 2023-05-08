import { Box, Stack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

export const Handler: FunctionComponent = () => (
  <Stack width="100%">
    <Stack direction="row">
      <Box width="50%">Handler</Box>
      <Box width="50%">Result</Box>
    </Stack>
  </Stack>
);
