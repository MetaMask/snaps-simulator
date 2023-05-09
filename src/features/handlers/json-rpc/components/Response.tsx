import { Editor } from '../../../../components';
import { useSelector } from '../../../../hooks';
import { getResponse } from '../../../simulation';

export const Response = () => {
  const response = useSelector(getResponse);

  return (
    <Editor
      value={JSON.stringify(response, null, 2)}
      options={{ readOnly: true }}
    />
  );
};
