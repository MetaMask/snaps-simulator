import { Box, Text } from '@chakra-ui/react';
import { Component, NodeType } from '@metamask/snaps-ui';
import { assert } from '@metamask/utils';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { FunctionComponent } from 'react';

import { EditableComponent, EditableNode } from './EditableNode';

export const EDITABLE_NODES = [
  NodeType.Heading,
  NodeType.Text,
  NodeType.Copyable,
];

type NodeProps = {
  node: NodeModel<Component>;
  depth: number;
  onChange: (node: NodeModel<Component>, value: string) => void;
};

/**
 * A node, which renders a component in the builder. The node can be editable or
 * non-editable.
 *
 * @param props - The props of the component.
 * @param props.node - The node to render.
 * @param props.depth - The depth of the node in the tree.
 * @param props.onChange - A function to call when the node changes.
 * @returns A node component.
 */
export const Node: FunctionComponent<NodeProps> = ({
  node,
  depth,
  onChange,
}) => {
  assert(node.data?.type, 'Node must have a type.');
  if (EDITABLE_NODES.includes(node.data.type)) {
    return (
      <EditableNode
        node={node as NodeModel<EditableComponent>}
        depth={depth}
        onChange={onChange}
      />
    );
  }

  return (
    <Box marginLeft={`${depth * 16}px`} boxShadow="md" padding="2">
      <Text>{node.text}</Text>
    </Box>
  );
};
