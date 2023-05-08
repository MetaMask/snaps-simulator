import { ChakraProvider } from '@chakra-ui/react';
import { FunctionComponent, ReactElement, StrictMode } from 'react';
import { Provider } from 'react-redux';

import type { createStore } from '../store';
import { theme } from '../theme';

export type RootProps = {
  store: ReturnType<typeof createStore>;
  children: ReactElement;
};

/**
 * Render the root component. This is the top-level component that wraps the
 * entire application.
 *
 * @param props - The props.
 * @param props.store - The Redux store.
 * @param props.children - The children to render.
 * @returns The root component.
 */
export const Root: FunctionComponent<RootProps> = ({ store, children }) => (
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  </StrictMode>
);
