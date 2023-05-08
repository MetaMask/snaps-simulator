import { IconName } from '../../components';
import { ApplicationState } from '../../store';

type ConditionFunction = (state: ApplicationState) => boolean;

export type NavigationItem = {
  label: string;
  tag: string;
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
    icon: 'textBubble',
    path: '/json-rpc',
  },
  {
    label: 'Cronjobs',
    tag: 'onCronjob',
    icon: 'alert',
    path: '/cronjobs',
  },
  {
    label: 'Transaction',
    tag: 'onTransaction',
    icon: 'textBubble',
    path: '/transactions',
  },
];
