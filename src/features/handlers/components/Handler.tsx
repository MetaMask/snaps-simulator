import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { History } from './History';
import { PlayButton } from './PlayButton';
import { Response } from './Response';
import { UserInterface } from './UserInterface';

export const Handler: FunctionComponent = () => {
  const [tab, setTab] = useState(0);

  return (
    <Flex width="100%" direction="column" overflow="hidden">
      <Flex direction="row" flex="1" overflow="hidden">
        <Flex direction="column" flex="1" width="50%" overflow="hidden">
          <Tabs
            display="flex"
            flexDirection="column"
            flex="1"
            overflow="hidden"
            isLazy={true}
            onChange={setTab}
          >
            <TabList alignItems="center">
              <Tab>Request</Tab>
              <Tab>History</Tab>
              {tab === 0 && (
                <Box marginLeft="auto">
                  <PlayButton />
                </Box>
              )}
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
};
