import { Box } from '@chakra-ui/react';
import { Component } from '@metamask/snaps-ui';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { FunctionComponent } from 'react';
import { useDrag } from 'react-dnd';

type TemplateComponentProps = {
  node: NodeModel<Component>;
  incrementId: () => void;
};

export const TemplateComponent: FunctionComponent<TemplateComponentProps> = ({
  node,
  incrementId,
}) => {
  const [, drag] = useDrag({
    type: 'template',
    item: node,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        incrementId();
      }
    },
  });

  return <Box ref={drag}>{node.text}</Box>;
};
