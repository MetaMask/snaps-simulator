import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react';
import { Heading, Text } from '@metamask/snaps-ui';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { FunctionComponent, useState } from 'react';

import { Icon } from '../../../components';

export type EditableComponent = Text | Heading;

type EditableNodeProps = {
  node: NodeModel<EditableComponent>;
  depth: number;
  onChange?: (node: NodeModel<EditableComponent>, value: string) => void;
};

/**
 * An editable node, which renders an editable component in the builder.
 *
 * @param props - The props of the component.
 * @param props.node - The editable node to render.
 * @param props.depth - The depth of the node in the tree.
 * @param props.onChange - A function to call when the node changes.
 * @returns An editable node component.
 */
export const EditableNode: FunctionComponent<EditableNodeProps> = ({
  node,
  depth,
  onChange,
}) => {
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    if (isEditing) {
      return (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton
            icon={<Icon icon="play" />}
            {...(getSubmitButtonProps() as any)}
          />
          <IconButton
            icon={<Icon icon="playMuted" />}
            {...(getCancelButtonProps() as any)}
          />
        </ButtonGroup>
      );
    }

    return <Icon icon="play" {...getEditButtonProps()} />;
  };

  const [value, setValue] = useState(node.text);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(node, newValue);
  };

  return (
    <Box marginLeft={`${depth * 16}px`} boxShadow="md" padding="2">
      <Editable value={value} onChange={handleChange}>
        <Flex alignItems="center" gap="1.5">
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls />
        </Flex>
      </Editable>
    </Box>
  );
};
