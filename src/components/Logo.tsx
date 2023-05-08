import { Image } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import logo from '../assets/metamask.svg';

/**
 * Render the MetaMask logo.
 *
 * @returns A React component.
 */
export const Logo: FunctionComponent = () => (
  <Image src={logo} alt="MetaMask" height="7" />
);
