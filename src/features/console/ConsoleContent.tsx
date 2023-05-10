import { Box, Text } from '@chakra-ui/react';

import { useSelector } from '../../hooks';
import { ConsoleEntryType, getConsoleEntries } from './slice';

export const ConsoleContent = () => {
  const entries = useSelector(getConsoleEntries);

  const colors = {
    [ConsoleEntryType.Log]: 'text.alternative',
    [ConsoleEntryType.Error]: 'text.error',
  };

  return (
    <Box>
      {entries.map((entry) => (
        <Text textColor={colors[entry.type]} fontFamily="code" key={entry.date}>
          {entry.message}
        </Text>
      ))}
    </Box>
  );
};
