import { Component, NodeType } from '@metamask/snaps-ui';
import { FunctionComponent } from 'react';

import { Copyable, Panel, Text, Divider, Heading, Spinner } from './components';

export const components: Record<
  NodeType,
  FunctionComponent<{ node: unknown }>
> = {
  [NodeType.Copyable]: Copyable,
  [NodeType.Divider]: Divider,
  [NodeType.Heading]: Heading,
  [NodeType.Panel]: Panel,
  [NodeType.Spinner]: Spinner,
  [NodeType.Text]: Text,
};

type RendererProps = {
  node: Component;
};

/**
 * A UI renderer for Snaps UI.
 *
 * @param props - The component props.
 * @param props.node - The component to render.
 * @returns The renderer component.
 */
export const Renderer: FunctionComponent<RendererProps> = ({ node }) => {
  const ReactComponent = components[node.type];

  if (!ReactComponent) {
    throw new Error(`Unknown component type: ${node.type}.`);
  }

  return <ReactComponent node={node}></ReactComponent>;
};
