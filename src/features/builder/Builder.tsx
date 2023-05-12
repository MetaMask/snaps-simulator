import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Component, heading, NodeType, text } from '@metamask/snaps-ui';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { FunctionComponent, useState } from 'react';

import { Editor } from '../../components';
import { TemplateComponentList, NodeTree, NodeRenderer } from './components';
import { nodeModelsToComponent, panelToCode } from './utils';

export const Builder: FunctionComponent = () => {
  const [id, setId] = useState<number>(100);
  const [items, setItems] = useState<NodeModel<Component>[]>([
    {
      id: 1,
      parent: 0,
      text: 'Panel',
      droppable: true,
      data: {
        type: NodeType.Panel,
        children: [],
      },
    },
    {
      id: 2,
      parent: 1,
      text: 'Heading',
      droppable: false,
      data: heading('Heading'),
    },
    {
      id: 3,
      parent: 1,
      text: 'Text',
      droppable: false,
      data: text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    },
  ]);

  const incrementId = () => {
    setId((state) => state + 1);
  };

  return (
    <Flex width="100%" direction="column" overflow="hidden">
      <Flex direction="row" flex="1" overflow="hidden">
        <Flex direction="column" flex="1" width="50%" overflow="hidden">
          <Tabs
            display="flex"
            flexDirection="column"
            flex="1"
            overflow="hidden"
          >
            <TabList>
              <Tab>Builder</Tab>
            </TabList>
            <TabPanels
              display="flex"
              flexDirection="column"
              flex="1"
              overflow="hidden"
            >
              <TabPanel display="flex" flexDirection="column" flex="1">
                <TemplateComponentList nextId={id} incrementId={incrementId} />
                <NodeTree items={items} setItems={setItems} />
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
          <Tabs
            display="flex"
            flexDirection="column"
            flex="1"
            overflow="hidden"
          >
            <TabList>
              <Tab>Result</Tab>
              <Tab>Code</Tab>
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
                padding="4"
              >
                <NodeRenderer items={items} />
              </TabPanel>
              <TabPanel
                display="flex"
                flexDirection="column"
                flex="1"
                padding="0"
              >
                <Editor
                  border="none"
                  value={panelToCode(nodeModelsToComponent(items))}
                  language="typescript"
                  options={{
                    readOnly: true,
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};
