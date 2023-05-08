import { render } from '../../../utils';
import { Item } from './Item';

describe('Item', () => {
  it('renders', () => {
    expect(() =>
      render(
        <Item icon="alert" path="foo">
          Bar
        </Item>,
      ),
    ).not.toThrow();
  });
});
