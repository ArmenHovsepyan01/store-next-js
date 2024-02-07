import { FC } from 'react';

interface CountProps {
  count: number;
}

const Count: FC<CountProps> = ({ count }) => {
  return <div>{count}</div>;
};

export default Count;
