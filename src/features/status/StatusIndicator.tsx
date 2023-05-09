import { Spinner, Text } from '@chakra-ui/react';

import { Icon } from '../../components';
import { useSelector } from '../../hooks';
import { getSnapUrl } from '../configuration';
import { SnapStatus, getStatus } from '../simulation';

export const StatusIndicator = () => {
  const snapUrl = useSelector(getSnapUrl);
  const status = useSelector(getStatus);

  const color =
    // eslint-disable-next-line no-nested-ternary
    status === SnapStatus.OK
      ? '#579F6E'
      : status === SnapStatus.Error
      ? '#D34C46'
      : '#0376C9';

  return (
    <>
      {status === SnapStatus.OK && <Icon icon="dot" width="8px" />}
      {status === SnapStatus.Loading && <Spinner color={color} size="xs" />}
      {status === SnapStatus.Error && (
        <Icon icon="errorTriangle" width="16px" />
      )}
      <Text fontWeight="600" textColor={color}>
        {snapUrl}
      </Text>
    </>
  );
};
