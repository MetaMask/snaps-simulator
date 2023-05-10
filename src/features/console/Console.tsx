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
    flex="1"
  >
    <Tabs display="flex" flexDirection="column" flex="1">
      <TabList>
        <Tab>Console</Tab>
      </TabList>
      <TabPanels display="flex" flexDirection="column" flex="1">
        <TabPanel
          display="flex"
          flexDirection="column"
          flex="1"
          overflowY="scroll"
        >
          <ConsoleContent />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Flex>
);
