import { Box, Container } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Editor } from '../../../components';

export const JsonRpc: FunctionComponent = () => (
  <Box flex="1">
    <Container size="fullWidth">
      <Editor />
    </Container>
  </Box>
);
