import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { HandlerType } from '@metamask/snaps-utils';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Editor } from '../../../../components';
import { useDispatch, useSelector } from '../../../../hooks';
import { sendRequest } from '../../../simulation';
import { SAMPLE_JSON_RPC_REQUEST } from '../../json-rpc/schema';
import { getTransactionRequest } from '../slice';

type TransactionFormData = {
  chainId: string;
  transaction: string;
  transactionOrigin: string;
};

export const Request: FunctionComponent = () => {
  const { chainId, transaction, transactionOrigin } = useSelector(
    getTransactionRequest,
  );
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      chainId: chainId ?? '',
      transactionOrigin: transactionOrigin ?? '',
      transaction: transaction ?? '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: TransactionFormData) => {
    dispatch(
      sendRequest({
        origin: '',
        handler: HandlerType.OnTransaction,
        request: {
          jsonrpc: '2.0',
          method: '',
          params: {
            chainId: data.chainId,
            transaction: JSON.parse(data.transaction),
            transactionOrigin: data.transactionOrigin,
          },
        },
      }),
    );
  };

  return (
    <Flex
      as="form"
      flexDirection="column"
      flex="1"
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      onSubmit={handleSubmit(onSubmit)}
      id="request-form"
    >
      <FormControl isInvalid={Boolean(errors.chainId)}>
        <FormLabel htmlFor="chainId">Chain ID</FormLabel>
        <Input
          id="chainId"
          placeholder="eip155:1"
          fontFamily="code"
          {...register('chainId')}
        />
        <FormErrorMessage>{errors.chainId?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.transactionOrigin)}>
        <FormLabel htmlFor="origin">Transaction Origin</FormLabel>
        <Input
          id="origin"
          placeholder="metamask.io"
          fontFamily="code"
          {...register('transactionOrigin')}
        />
        <FormErrorMessage>{errors.transactionOrigin?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={Boolean(errors.transaction)}
        display="flex"
        flexDirection="column"
        flex="1"
      >
        <FormLabel htmlFor="transaction">Transaction</FormLabel>
        <Controller
          control={control}
          name="transaction"
          render={({ field: { onChange, value } }) => (
            <Editor onChange={onChange} value={value} />
          )}
        />
      </FormControl>
    </Flex>
  );
};
