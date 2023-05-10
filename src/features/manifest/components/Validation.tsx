import { List } from '@chakra-ui/react';
import { FunctionComponent, useEffect, useState } from 'react';

import { useSelector } from '../../../hooks';
import { getSnapManifest, getSourceCode } from '../../simulation';
import { validators, Validator } from '../validators';
import { Item } from './Item';

type ValidationResult = Omit<Validator, 'validator'> & {
  isValid: boolean;
  message?: string | undefined;
};

export const Validation: FunctionComponent = () => {
  const manifest = useSelector(getSnapManifest);
  const sourceCode = useSelector(getSourceCode);
  const [results, setResults] = useState<ValidationResult[]>([]);

  // TODO: Fetch icon.

  useEffect(() => {
    if (!manifest) {
      return;
    }

    const promises = validators.map(
      async ({ name, manifestName, validator }) => {
        const result = await validator(manifest, {
          sourceCode,
          icon: '',
        });

        const message = typeof result === 'string' ? result : undefined;
        const isValid = typeof result === 'boolean' ? result : false;

        return {
          name,
          manifestName,
          isValid,
          message,
        };
      },
    );

    Promise.all(promises)
      .then((newResults) => {
        setResults(newResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [manifest, sourceCode]);

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
