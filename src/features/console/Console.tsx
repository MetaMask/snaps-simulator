import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

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
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Console</TabPanel>
        <TabPanel>History</TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);
