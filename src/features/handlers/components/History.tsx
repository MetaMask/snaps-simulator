import { List } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { useHandler, useSelector } from '../../../hooks';
import { HistoryItem } from './HistoryItem';

export const History: FunctionComponent = () => {
  const handler = useHandler();
  const history = useSelector((state) => state[handler].history);
  const sortedHistory = [...history].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  if (sortedHistory.length === 0) {
    return null;
  }

  return (
    <List>
      {sortedHistory.map((item, index) => (
        <HistoryItem item={item} key={`history-item-${index}`} />
      ))}
    </List>
  );
};
