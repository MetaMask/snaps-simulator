import { render } from '@testing-library/react';

import { App } from './App';
import { Root } from './components';
import { createStore } from './store';

describe('App', () => {
  it('renders', () => {
    expect(() =>
      render(
        <Root store={createStore()}>
          <App />
        </Root>,
      ),
    ).not.toThrow();
  });
});
