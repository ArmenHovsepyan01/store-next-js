import React, { FC } from 'react';

interface ITitle {
  title: string;
}

const Title: FC<ITitle> = ({ title }) => {
  return <span>{title}</span>;
};

export default Title;
