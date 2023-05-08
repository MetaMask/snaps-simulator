import { Box, Button, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { useDispatch, useSelector } from '../../../hooks';
import { setFoo } from '../slice';

/**
 * Render the foo component. This component is used to demonstrate the use of
 * `useSelector` and `useDispatch`.
 *
 * @returns A React component.
 */
export const Foo: FunctionComponent = () => {
  const foo = useSelector((state) => state.overview.foo);
  const dispatch = useDispatch();

  /**
   * Handle the click event of the button. This function sets the value of `foo`
   * to either `bar` or `foo`, depending on the current value of `foo`.
   *
   * @returns The result of {@link dispatch}.
   */
  const handleClick = () => {
    if (foo === 'bar') {
      return dispatch(setFoo('foo'));
    }

    return dispatch(setFoo('bar'));
  };

  return (
    <Box>
      <Text>Foo: {foo}</Text>
      <Button onClick={handleClick}>Change foo</Button>
    </Box>
  );
};
