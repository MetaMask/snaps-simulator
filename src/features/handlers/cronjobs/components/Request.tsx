import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Editor } from '../../../../components';
import { SAMPLE_JSON_RPC_REQUEST } from '../../json-rpc/schema';

type CronjobFormData = {
  origin: string;
  request: string;
};

export const Request: FunctionComponent = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CronjobFormData>({
    defaultValues: {
      origin: '',
      request: SAMPLE_JSON_RPC_REQUEST,
    },
  });

  const onSubmit = (data: CronjobFormData) => {
    console.log(data);
  };

  return (
    <Flex
      as="form"
      flexDirection="column"
      flex="1"
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={Boolean(errors.origin)}>
        <FormLabel htmlFor="origin">Origin</FormLabel>
        <Input
          id="origin"
          placeholder="metamask.io"
          fontFamily="code"
          {...register('origin')}
        />
        <FormErrorMessage>{errors.origin?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={Boolean(errors.request)}
        display="flex"
        flexDirection="column"
        flex="1"
      >
        <FormLabel htmlFor="request">Request</FormLabel>
        <Controller
          control={control}
          name="request"
          render={({ field: { onChange, value } }) => (
            <Editor onChange={onChange} value={value} />
          )}
        />
      </FormControl>

      <Button type="submit" marginTop="4">
        Submit
      </Button>
    </Flex>
  );
};
