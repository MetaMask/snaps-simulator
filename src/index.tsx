import { assert } from '@metamask/utils';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Root } from './components';
import { createStore } from './store';

const rootElement = document.getElementById('root');
assert(rootElement, 'Root element not found.');

const store = createStore();
const root = createRoot(rootElement);

root.render(
  <Root store={store}>
    <App />
  </Root>,
);
