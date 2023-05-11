import { Image, PropsOf } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import alertIcon from '../assets/icons/alert.svg';
import arrowDownIcon from '../assets/icons/arrow-down.svg';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import arrowTopRightIcon from '../assets/icons/arrow-top-right.svg';
import computerIcon from '../assets/icons/computer.svg';
import configurationIcon from '../assets/icons/configuration.svg';
import copiedIcon from '../assets/icons/copied.svg';
import copyIcon from '../assets/icons/copy.svg';
import cronjobIcon from '../assets/icons/cronjob.svg';
import darkArrowTopRightIcon from '../assets/icons/dark-arrow-top-right.svg';
import dotIcon from '../assets/icons/dot.svg';
import errorTriangleIcon from '../assets/icons/error-triangle.svg';
import gitHubIcon from '../assets/icons/github.svg';
import insightsIcon from '../assets/icons/insights.svg';
import jsonRpcIcon from '../assets/icons/json-rpc.svg';
import manifestIcon from '../assets/icons/manifest.svg';
import moonIcon from '../assets/icons/moon.svg';
import playErrorIcon from '../assets/icons/play-error.svg';
import playMutedIcon from '../assets/icons/play-muted.svg';
import playSuccessIcon from '../assets/icons/play-success.svg';
import playIcon from '../assets/icons/play.svg';
import snapIcon from '../assets/icons/snap.svg';
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
  arrowTopRight: {
    alt: 'Arrow pointing top right',
    src: arrowTopRightIcon,
  },
  darkArrowTopRightIcon: {
    alt: 'Arrow pointing top right',
    src: darkArrowTopRightIcon,
  },
  arrowDown: {
    alt: 'Arrow pointing down',
    src: arrowDownIcon,
  },
  textBubble: {
    alt: 'Text bubble',
    src: textBubbleIcon,
  },
  configuration: {
    alt: 'Configuration',
    src: configurationIcon,
  },
  play: {
    alt: 'Play',
    src: playIcon,
  },
  playMuted: {
    alt: 'Play',
    src: playMutedIcon,
  },
  playSuccess: {
    alt: 'Success',
    src: playSuccessIcon,
  },
  playError: {
    alt: 'Error',
    src: playErrorIcon,
  },
  dot: {
    alt: 'OK',
    src: dotIcon,
  },
  errorTriangle: {
    alt: 'Error',
    src: errorTriangleIcon,
  },
  computer: {
    alt: 'Computer',
    src: computerIcon,
  },
  snap: {
    alt: 'Snap',
    src: snapIcon,
  },
  copy: {
    alt: 'Copy',
    src: copyIcon,
  },
  copied: {
    alt: 'Copied',
    src: copiedIcon,
  },
  moon: {
    alt: 'Moon',
    src: moonIcon,
  },
  manifest: {
    alt: 'Manifest',
    src: manifestIcon,
  },
  gitHub: {
    alt: 'GitHub',
    src: gitHubIcon,
  },
  cronjob: {
    alt: 'Cronjob',
    src: cronjobIcon,
  },
  insights: {
    alt: 'Insights',
    src: insightsIcon,
  },
  jsonRpc: {
    alt: 'JSON-RPC',
    src: jsonRpcIcon,
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
