import { Flex, Spinner, Text } from '@chakra-ui/react';

import { Icon } from '../../components';
import { useDispatch, useSelector } from '../../hooks';
import { getSnapUrl, openConfigurationModal } from '../configuration';
import { SnapStatus, getStatus } from '../simulation';

export const StatusIndicator = () => {
  const snapUrl = useSelector(getSnapUrl);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  const color =
    // eslint-disable-next-line no-nested-ternary
    status === SnapStatus.Ok
      ? 'text.success'
      : status === SnapStatus.Error
      ? 'text.error'
      : 'info.default';

  const handleClick = () => {
    dispatch(openConfigurationModal());
  };

  return (
    <Flex alignItems="center" gap="2" onClick={handleClick} cursor="pointer">
      {status === SnapStatus.Ok && <Icon icon="dot" width="8px" />}
      {status === SnapStatus.Loading && <Spinner color={color} size="xs" />}
      {status === SnapStatus.Error && (
        <Icon icon="errorTriangle" width="16px" />
      )}
      <Text fontWeight="600" textColor={color}>
        {snapUrl}
      </Text>
    </Flex>
  );
};
