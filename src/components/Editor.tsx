import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import MonacoEditor, { monaco, MonacoEditorProps } from 'react-monaco-editor';

import {
  JSON_RPC_SCHEMA,
  JSON_RPC_SCHEMA_URL,
  SAMPLE_JSON_RPC_REQUEST,
} from '../features/handlers/json-rpc/schema';

/**
 * Wrapper component for Monaco Editor. This is used to set the height of the
 * editor, since Chakra UI's Box component doesn't pass the height prop to the
 * underlying DOM element otherwise.
 *
 * @param props - The props.
 * @param props.height - The height of the editor. Defaults to 200px.
 * @returns The wrapper component.
 */
const MonacoWrapper: FunctionComponent<MonacoEditorProps> = ({
  height = '200px',
  ...props
}) => <MonacoEditor height={height} {...props} />;

/**
 * Editor component. This uses Monaco Editor to provide a JSON editor.
 *
 * @returns The editor component.
 */
export const Editor: FunctionComponent = () => {
  const handleMount = (editor: typeof monaco) => {
    editor.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: JSON_RPC_SCHEMA_URL,
          fileMatch: ['*'],
          schema: JSON_RPC_SCHEMA,
        },
      ],
    });
  };

  return (
    <Box
      as={MonacoWrapper}
      width="100%"
      height="200px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.muted"
      language="json"
      editorWillMount={handleMount}
      value={SAMPLE_JSON_RPC_REQUEST}
      options={{
        tabSize: 2,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'none',
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: 'visible',
          verticalScrollbarSize: 5,
        },
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};
