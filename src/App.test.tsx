import { App } from './App';
import { render } from './utils';

describe('App', () => {
  it('renders', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
