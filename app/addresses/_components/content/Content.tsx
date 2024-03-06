import React, { FC } from 'react';
import CreateAddressForm from '@/app/addresses/_components/create-address-form/CreateAddressForm';
import YourAddresses from '@/app/addresses/_components/content/your-addresses/YourAddresses';

interface IContent {
  category: string;
}

const Content: FC<IContent> = ({ category }) => {
  if (category === '1') return <YourAddresses />;

  return <CreateAddressForm />;
};

export default Content;
