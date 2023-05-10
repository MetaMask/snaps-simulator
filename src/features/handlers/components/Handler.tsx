import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import { Icon } from '../../../components';
import { History } from './History';
import { Response } from './Response';
import { UserInterface } from './UserInterface';

export const Handler: FunctionComponent = () => (
  <Flex width="100%" direction="column" overflow="hidden">
    <Flex direction="row" flex="1" overflow="hidden">
      <Flex direction="column" flex="1" width="50%" overflow="hidden">
        <Tabs
          display="flex"
          flexDirection="column"
          flex="1"
          overflow="hidden"
          isLazy={true}
        >
          <TabList alignItems="center">
            <Tab>Request</Tab>
            <Tab>History</Tab>
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
          <TabPanels
            display="flex"
            flexDirection="column"
            flex="1"
            overflow="hidden"
          >
            <TabPanel display="flex" flexDirection="column" flex="1">
              <Outlet />
            </TabPanel>
            <TabPanel padding="0" overflowY="auto">
              <History />
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
            <Tab>UI</Tab>
          </TabList>
          <TabPanels display="flex" flexDirection="column" flex="1">
            <TabPanel
              display="flex"
              flexDirection="column"
              flex="1"
              padding="0"
            >
              <Response />
            </TabPanel>
            <TabPanel>
              <UserInterface />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </Flex>
);
