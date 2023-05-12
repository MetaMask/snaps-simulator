import { Box } from '@chakra-ui/react';
import { Component, NodeType, panel } from '@metamask/snaps-ui';
import { FunctionComponent, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export type PanelProps = {
  // onDrop: (item: Component) => void;
  nodes?: Component[];
};

export const Panel: FunctionComponent<PanelProps> = ({ nodes = [] }) => {
  const ref = useRef(null);
  const [children, setChildren] = useState<Component[]>(nodes);

  const [{ isDragging }, dragRef] = useDrag({
    type: NodeType.Panel,
    item: panel(children),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDrop = (item: Component) => {
    setChildren((state) => [...state, item]);
  };

  const [, dropRef] = useDrop<Component>({
    accept: NodeType.Panel,
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <Box>
      <Box ref={ref} opacity={isDragging ? 0.5 : 1} boxShadow="lg" padding="4">
        Panel
      </Box>
      {children.map((child) => (
        <Panel key={Math.random().toString()} nodes={(child as any).children} />
      ))}
    </Box>
  );
};
