import {
  LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

type LinkProps = {
  to: string;
} & ChakraLinkProps &
  RouterLinkProps;

/**
 * A link component for internal links. This component is a wrapper around
 * Chakra's Link component and React Router's Link component, to use both
 * together.
 *
 * @param props - The props of the component.
 * @param props.to - The path to link to.
 * @param props.children - The children of the component.
 * @returns The link component.
 */
export const Link: FunctionComponent<LinkProps> = ({
  to,
  children,
  ...props
}) => (
  <ChakraLink as={RouterLink} to={to} {...props}>
    {children}
  </ChakraLink>
);
