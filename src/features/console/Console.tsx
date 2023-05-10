import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { ConsoleContent } from './ConsoleContent';

/**
 * Console component.
 *
 * @returns The console component.
 */
export const Console: FunctionComponent = () => (
  <Box borderTop="1px solid" borderColor="border.default" height="266px">
    <Tabs>
      <TabList>
        <Tab>Console</Tab>
      </TabList>
      <TabPanels>
        <TabPanel overflowY="scroll">
          <ConsoleContent />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);
