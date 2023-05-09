import {
  Flex,
  Button,
  Tabs,
  Tab,
  Box,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { Icon } from '../../../components';
import { Response } from '../components';
import { Request } from './components';

export const JsonRpc: FunctionComponent = () => (
  <Flex width="100%" direction="column">
    <Flex direction="row" flex="1">
      <Flex direction="column" flex="1" width="50%">
        <Tabs display="flex" flexDirection="column" flex="1">
          <TabList alignItems="center">
            <Tab>Request</Tab>
            <Box marginLeft="auto">
              <Button
                variant="unstyled"
                type="submit"
                minWidth="0"
                form="request-form"
              >
                <Icon icon="play" width="24px" />
              </Button>
            </Box>
          </TabList>
          <TabPanels display="flex" flexDirection="column" flex="1">
            <TabPanel display="flex" flexDirection="column" flex="1">
              <Request />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        width="50%"
        borderLeft="1px solid"
        borderColor="border.default"
      >
        <Tabs display="flex" flexDirection="column" flex="1">
          <TabList>
            <Tab>Response</Tab>
            <Tab>History</Tab>
          </TabList>
          <TabPanels display="flex" flexDirection="column" flex="1">
            <TabPanel display="flex" flexDirection="column" flex="1">
              <Response />
            </TabPanel>
            <TabPanel>Bar</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </Flex>
);
