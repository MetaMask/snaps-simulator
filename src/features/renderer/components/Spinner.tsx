import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

export type SpinnerProps = {
  node: unknown;
};

export const Spinner: FunctionComponent<SpinnerProps> = () => <ChakraSpinner />;
