import { Box } from '@chakra-ui/react';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { FunctionComponent } from 'react';

import { AlertDialog } from '../../../components';

export const Transactions: FunctionComponent = () => (
  <Box margin="4" width="500px">
    <AlertDialog
      snapName="foo-snap"
      snapId="local:http://localhost:8000"
      node={panel([
        heading('Heading ipsum'),
        text('**Heading ipsum**'),
        text(
          'Modernipsum dolor sit amet cubism neue slowenische kunst synchronism neo-dada',
        ),
        divider(),
        text('**Heading ipsum**'),
        copyable('0x1234567890'),
      ])}
    />
  </Box>
);
