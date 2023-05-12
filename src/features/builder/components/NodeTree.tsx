import { Divider } from '@chakra-ui/react';
import { Component } from '@metamask/snaps-ui';
import {
  NodeModel,
  NodeRender,
  Tree,
  TreeMethods,
} from '@minoru/react-dnd-treeview';
import { FunctionComponent, useEffect, useRef } from 'react';

import { Node } from './Node';

export type NodeTreeProps = {
  items: NodeModel<Component>[];
  setItems: (items: NodeModel<Component>[]) => void;
};

/**
 * A node tree, which renders the UI components in the builder.
 *
 * @param props - The props of the component.
 * @param props.items - The items to render in the tree.
 * @param props.setItems - A function to set the items in the tree.
 * @returns A node tree component.
 */
export const NodeTree: FunctionComponent<NodeTreeProps> = ({
  items,
  setItems,
}) => {
  const ref = useRef<TreeMethods>(null);

  const handleChange = (node: NodeModel<Component>, value: string) => {
    // TODO: This code is a mess.
    const newItems: any = items.map((item) => {
      if (item.id === node.id) {
        return {
          ...item,
          data: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            type: item.data!.type,
            value,
          },
          text: value,
        };
      }

      return item;
    });

    setItems(newItems);
  };

  const handleDrop = (newItems: NodeModel<Component>[]) => {
    setItems(newItems);
  };

  const handleRender: NodeRender<Component> = (node, { depth }) => {
    return <Node node={node} depth={depth} onChange={handleChange} />;
  };

  const handleRenderPlaceholder = () => {
    return <Divider margin="0" padding="0" />;
  };

  const handleCanDrag = (node?: NodeModel<Component>) => {
    if (node) {
      return node.id >= 2;
    }

    return false;
  };

  const handleCanDrop = (
    _tree: NodeModel<Component>[],
    {
      dropTarget,
      dropTargetId,
    }: {
      dropTarget?: NodeModel<Component> | undefined;
      dropTargetId?: string | number;
    },
  ) => {
    return dropTarget?.droppable && dropTargetId !== 0;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.openAll();
    }
  }, [items, ref]);

  return (
    <Tree
      ref={ref}
      tree={items}
      rootId={0}
      render={handleRender}
      insertDroppableFirst={false}
      canDrag={handleCanDrag}
      canDrop={handleCanDrop}
      onDrop={handleDrop}
      initialOpen={true}
      sort={false}
      extraAcceptTypes={['template']}
      placeholderRender={handleRenderPlaceholder}
    />
  );
};
