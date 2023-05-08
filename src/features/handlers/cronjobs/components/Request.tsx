import {
  Box,
  Button,
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
    <Box flex="1">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <FormControl isInvalid={Boolean(errors.request)}>
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
      </form>
    </Box>
  );
};
