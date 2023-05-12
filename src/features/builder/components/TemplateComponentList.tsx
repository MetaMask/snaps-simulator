import { Flex, List, ListItem } from '@chakra-ui/react';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { FunctionComponent } from 'react';

import { Prefill } from '../../../components';
import { TemplateComponent } from './TemplateComponent';

const TEMPLATE_COMPONENTS = [
  {
    text: 'Panel',
    data: panel([]),
    droppable: true,
  },
  {
    text: 'Heading',
    data: heading('Heading'),
    droppable: false,
  },
  {
    text: 'Text',
    data: text('Text'),
    droppable: false,
  },
  {
    text: 'Divider',
    data: divider(),
    droppable: false,
  },
  {
    text: 'Copyable',
    data: copyable('Copyable text'),
    droppable: false,
  },
];

export type ComponentsListProps = {
  nextId: number;
  incrementId: () => void;
};

export const TemplateComponentList: FunctionComponent<ComponentsListProps> = ({
  nextId,
  incrementId,
}) => (
  <Flex as={List} gap="2">
    {TEMPLATE_COMPONENTS.map((component) => (
      <ListItem key={`component-${component.text}`}>
        <Prefill cursor="move">
          <TemplateComponent
            incrementId={incrementId}
            node={{
              id: nextId,
              parent: 0,
              droppable: component.droppable,
              text: component.text,
              data: component.data,
            }}
          />
        </Prefill>
      </ListItem>
    ))}
  </Flex>
);
