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
import { TransactionFormData, hexlifyTransactionData } from '../utils';

export const Request: FunctionComponent = () => {
  const { request } = useSelector(getTransactionRequest);
  const {
    chainId: defaultChainId,
    transactionOrigin: defaultTransactionOrigin,
    transaction: defaultTransaction,
  } = request?.params ?? {};
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      chainId: defaultChainId ?? '',
      transactionOrigin: defaultTransactionOrigin ?? '',
      ...defaultTransaction,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: TransactionFormData) => {
    const { chainId, transactionOrigin, ...transaction } = data;
    dispatch(
      sendRequest({
        origin: '',
        handler: HandlerType.OnTransaction,
        request: {
          jsonrpc: '2.0',
          // This doesn't actually matter as it is stripped, but it shows up nicely in the history view
          method: 'onTransaction',
          params: {
            chainId,
            transaction: hexlifyTransactionData(transaction),
            transactionOrigin,
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

      <FormControl isInvalid={Boolean(errors.from)}>
        <FormLabel htmlFor="from">From Address</FormLabel>
        <Input
          id="from"
          placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          fontFamily="code"
          {...register('from')}
        />
        <FormErrorMessage>{errors.from?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.to)}>
        <FormLabel htmlFor="to">To Address</FormLabel>
        <Input
          id="to"
          placeholder="0x9f2817015caF6607C1198fB943A8241652EE8906"
          fontFamily="code"
          {...register('to')}
        />
        <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
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
        <FormControl isInvalid={Boolean(errors.gas)}>
          <FormLabel htmlFor="gas">Gas Limit</FormLabel>
          <Input
            id="gas"
            placeholder="21000"
            fontFamily="code"
            {...register('gas')}
          />
          <FormErrorMessage>{errors.gas?.message}</FormErrorMessage>
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
