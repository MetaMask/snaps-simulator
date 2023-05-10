import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FunctionComponent, useEffect, useRef } from 'react';

import { useSelector } from '../../hooks';
import { ConsoleContent } from './ConsoleContent';
import { getConsoleEntries } from './slice';

/**
 * Console component.
 *
 * @returns The console component.
 */
export const Console: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  const entries = useSelector(getConsoleEntries);

  useEffect(() => {
    if (ref.current) {
      // TODO: Maybe not scroll if the user is scrolled up?
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [entries]);

  return (
    <Flex
      borderTop="1px solid"
      borderColor="border.default"
      height="266px"
      flexDirection="column"
      overflow="hidden"
    >
      <Tabs display="flex" flexDirection="column" flex="1" overflow="hidden">
        <TabList>
          <Tab>Console</Tab>
        </TabList>
        <TabPanels
          display="flex"
          flexDirection="column"
          flex="1"
          overflow="hidden"
        >
          <TabPanel
            ref={ref}
            display="flex"
            flexDirection="column"
            flex="1"
            overflowY="auto"
          >
            <ConsoleContent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
