import { List } from '@chakra-ui/react';

import { render } from '../../../utils';
import { Item } from './Item';

describe('Item', () => {
  it('renders', () => {
    expect(() =>
      render(
        <List>
          <Item icon="alert" path="foo">
            Bar
          </Item>
        </List>,
      ),
    ).not.toThrow();
  });
});
