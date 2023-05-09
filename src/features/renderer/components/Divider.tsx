import { Divider as ChakraDivider } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

export type DividerProps = {
  node: unknown;
};

export const Divider: FunctionComponent<DividerProps> = () => (
  <ChakraDivider
    orientation="horizontal"
    marginTop="3"
    marginBottom="4"
    borderColor="border.default"
  />
);
