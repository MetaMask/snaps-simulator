import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Request } from './components';

export const Cronjobs: FunctionComponent = () => (
  <Flex width="100%" direction="column">
    <Flex direction="row" flex="1">
      <Box width="50%">
        <Tabs>
          <TabList>
            <Tab>Request</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Request />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box width="50%" borderLeft="1px solid" borderColor="border.default">
        <Tabs>
          <TabList>
            <Tab>Response</Tab>
            <Tab>History</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Foo</TabPanel>
            <TabPanel>Bar</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </Flex>
);
