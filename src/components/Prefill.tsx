import { Tag, TagProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

import { Icon } from './Icon';

type PrefillProps = TagProps & {
  children: ReactNode;
};

export const Prefill = forwardRef<unknown, PrefillProps>(
  ({ children, ...props }, ref) => (
    <Tag
      ref={ref}
      width="fit-content"
      fontWeight="400"
      fontSize="xs"
      fontFamily="code"
      borderRadius="xl"
      background="background.alternative"
      _hover={{
        background: 'info.muted',
      }}
      {...props}
    >
      {children}
      <Icon icon="darkArrowTopRightIcon" width="10px" marginLeft="1.5" />
    </Tag>
  ),
);
