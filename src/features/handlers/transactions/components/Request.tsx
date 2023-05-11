/* eslint-disable react/no-children-prop */
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import { HandlerType } from '@metamask/snaps-utils';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from '../../../../hooks';
import { sendRequest } from '../../../simulation';
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
      <Flex gap="2">
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
          <FormErrorMessage>
            {errors.transactionOrigin?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={Boolean(errors.fromAddress)}>
        <FormLabel htmlFor="fromAddress">From Address</FormLabel>
        <Input
          id="fromAddress"
          placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          fontFamily="code"
          {...register('fromAddress')}
        />
        <FormErrorMessage>{errors.fromAddress?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.toAddress)}>
        <FormLabel htmlFor="toAddress">To Address</FormLabel>
        <Input
          id="toAddress"
          placeholder="0x9f2817015caF6607C1198fB943A8241652EE8906"
          fontFamily="code"
          {...register('toAddress')}
        />
        <FormErrorMessage>{errors.toAddress?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.value)}>
        <FormLabel htmlFor="value">Value</FormLabel>
        <InputGroup>
          <Input
            id="value"
            placeholder="0.01"
            fontFamily="code"
            {...register('value')}
          />
          <InputRightAddon children="ETH" />
        </InputGroup>

        <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
      </FormControl>

      <Flex gap="2">
        <FormControl isInvalid={Boolean(errors.gasLimit)}>
          <FormLabel htmlFor="gasLimit">Gas Limit</FormLabel>
          <Input
            id="gasLimit"
            placeholder="21000"
            fontFamily="code"
            {...register('gasLimit')}
          />
          <FormErrorMessage>{errors.gasLimit?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.nonce)}>
          <FormLabel htmlFor="nonce">Nonce</FormLabel>
          <Input
            id="nonce"
            placeholder="5"
            fontFamily="code"
            {...register('nonce')}
          />
          <FormErrorMessage>{errors.nonce?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="2">
        <FormControl isInvalid={Boolean(errors.maxFeePerGas)}>
          <FormLabel htmlFor="maxFeePerGas">Max Fee Per Gas</FormLabel>
          <InputGroup>
            <Input
              id="maxFeePerGas"
              placeholder="10"
              fontFamily="code"
              {...register('maxFeePerGas')}
            />
            <InputRightAddon children="GWEI" />
          </InputGroup>

          <FormErrorMessage>{errors.maxFeePerGas?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.maxPriorityFeePerGas)}>
          <FormLabel htmlFor="maxPriorityFeePerGas">
            Max Priority Fee Per Gas
          </FormLabel>
          <InputGroup>
            <Input
              id="maxPriorityFeePerGas"
              placeholder="1"
              fontFamily="code"
              {...register('maxPriorityFeePerGas')}
            />
            <InputRightAddon children="GWEI" />
          </InputGroup>

          <FormErrorMessage>
            {errors.maxPriorityFeePerGas?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={Boolean(errors.data)}>
        <FormLabel htmlFor="data">Data</FormLabel>
        <Textarea
          id="data"
          placeholder="0x"
          fontFamily="code"
          {...register('data')}
        />
        <FormErrorMessage>{errors.data?.message}</FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
