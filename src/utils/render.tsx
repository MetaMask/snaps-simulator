import { render as testingLibraryRender } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Root } from '../components';
import { createStore } from '../store';

/**
 * Render a component for testing. This function wraps the component in a
 * `Root` component, which provides the component with the same context that
 * it would have in the app.
 *
 * @param component - The component to render.
 * @returns The rendered component.
 */
export function render(component: ReactElement) {
  const store = createStore();
  return testingLibraryRender(component, {
    wrapper: ({ children }) => (
      <Root store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Root>
    ),
  });
}
