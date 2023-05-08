import { Container, Divider, Heading, Stack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Logo } from '../../../components';

export const Header: FunctionComponent = () => (
  <Container as="header" size="fullWidth" borderBottom="muted">
    <Stack direction="row" background="white" height="7" align="center">
      <Logo />
      <Divider orientation="vertical" marginX="2" borderColor="gray.muted" />
      <Heading as="h1" fontSize="1rem" lineHeight="150%">
        Snaps Simulator
      </Heading>
    </Stack>
  </Container>
);
