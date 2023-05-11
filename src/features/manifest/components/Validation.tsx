import { List } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { useSelector } from '../../../hooks';
import { getManifestResults } from '../slice';
import { Item } from './Item';

export const Validation: FunctionComponent = () => {
  const results = useSelector(getManifestResults);

  return (
    <List>
      {results.map(({ name, manifestName, isValid, message }) => (
        <Item
          key={name}
          name={name}
          manifestName={manifestName}
          isValid={isValid}
          message={message}
        />
      ))}
    </List>
  );
};
