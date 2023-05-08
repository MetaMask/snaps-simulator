import { Image, PropsOf } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import alertIcon from '../assets/icons/alert.svg';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import textBubbleIcon from '../assets/icons/text-bubble.svg';

const DEFAULT_ICONS = {
  alert: {
    alt: 'Alert',
    src: alertIcon,
  },
  arrowRight: {
    alt: 'Arrow pointing right',
    src: arrowRightIcon,
  },
  textBubble: {
    alt: 'Text bubble',
    src: textBubbleIcon,
  },
};

export type IconName = keyof typeof DEFAULT_ICONS;

export type IconProps = {
  icon: IconName;
  alt?: string;
  width?: string;
  height?: string;
} & PropsOf<typeof Image>;

/**
 * Icon component, which renders one of the predefined icons.
 *
 * The component is based on Chakra UI's {@link Image} component, so all props
 * supported by {@link Image} are also supported by this component.
 *
 * @param props - Icon props.
 * @param props.icon - The name of the icon, e.g. 'alert'.
 * @param props.alt - The alt text for the icon.
 * @param props.width - The width of the icon. Defaults to '32px'.
 * @param props.height - The height of the icon. Defaults to '32px'.
 * @returns The icon component.
 */
export const Icon: FunctionComponent<IconProps> = ({
  icon,
  alt = DEFAULT_ICONS[icon].alt,
  width = '32px',
  height = width,
  ...props
}) => (
  <Image
    src={DEFAULT_ICONS[icon].src}
    alt={alt}
    width={width}
    height={height}
    {...props}
  />
);
