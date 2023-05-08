import { Box, BoxProps } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import MonacoEditor, { monaco, MonacoEditorProps } from 'react-monaco-editor';

import {
  JSON_RPC_SCHEMA,
  JSON_RPC_SCHEMA_URL,
  SAMPLE_JSON_RPC_REQUEST,
} from '../features/handlers/json-rpc/schema';

export type EditorProps = MonacoEditorProps & BoxProps;

/**
 * Editor component. This uses Monaco Editor to provide a JSON editor.
 *
 * @param props - The props.
 * @returns The editor component.
 */
export const Editor: FunctionComponent<EditorProps> = (props) => {
  const handleMount = (editor: typeof monaco) => {
    editor.languages.json?.jsonDefaults.setDiagnosticsOptions({
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
      width="100%"
      padding="4"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.muted"
      flex="1"
    >
      <MonacoEditor
        language="json"
        editorWillMount={handleMount}
        value={SAMPLE_JSON_RPC_REQUEST}
        theme="vs-light"
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
          lineNumbers: 'off',
          automaticLayout: true,
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
        }}
        {...props}
      />
    </Box>
  );
};
