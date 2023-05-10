import { render } from '../../../utils';
import { UserInterface } from './UserInterface';

describe('UserInterface', () => {
  it('renders', () => {
    expect(() =>
      render(<UserInterface />, '/handler/onRpcRequest'),
    ).not.toThrow();
  });
});
