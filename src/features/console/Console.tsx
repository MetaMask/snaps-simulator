import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { ConsoleContent } from './ConsoleContent';

/**
 * Console component.
 *
 * @returns The console component.
 */
export const Console: FunctionComponent = () => (
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
