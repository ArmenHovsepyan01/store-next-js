import React, { FC } from 'react';

interface IAddress {
  address: string;
}

const Address: FC<IAddress> = ({ address }) => {
  return <div>{address}</div>;
};

export default Address;
