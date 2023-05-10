import { HandlerType } from '@metamask/snaps-utils';

import { IconName } from '../../components';
import { ApplicationState } from '../../store';

type ConditionFunction = (state: ApplicationState) => boolean;

export type NavigationItem = {
  label: string;
  tag: string;
  description: string;
  icon: IconName;
  path: string;

  /**
   * Conditionally render the navigation item. If not provided, the item will
   * always be rendered.
   */
  condition?: ConditionFunction;
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'JSON-RPC',
    tag: 'onRpcRequest',
    description: 'Send JSON-RPC requests to the snap',
    icon: 'textBubble',
    path: `/handler/${HandlerType.OnRpcRequest}`,
  },
  {
    label: 'Cronjobs',
    tag: 'onCronjob',
    description: 'Schedule and run periodic actions',
    icon: 'alert',
    path: `/handler/${HandlerType.OnCronjob}`,
  },
  {
    label: 'Transaction',
    tag: 'onTransaction',
    description: 'Send transactions to the snap',
    icon: 'textBubble',
    path: `/handler/${HandlerType.OnTransaction}`,
  },
];
