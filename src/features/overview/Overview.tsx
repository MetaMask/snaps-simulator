import { FunctionComponent } from 'react';

import { Logo } from '../../components';
import { Foo } from './components';

/**
 * Render the overview page.
 *
 * @returns A React component.
 */
export const Overview: FunctionComponent = () => {
  return (
    <div>
      <Logo />
      <Foo />
    </div>
  );
};
