import React, { FC } from 'react';
import CreateAddressForm from '@/app/addresses/_components/create-address-form/CreateAddressForm';
import YourAddresses from '@/app/addresses/_components/content/your-addresses/YourAddresses';

interface IContent {
  category: string;
  setCategory: (category: string) => void;
}

const Content: FC<IContent> = ({ category, setCategory }) => {
  if (category === '1') return <YourAddresses />;

  return <CreateAddressForm setCategory={setCategory} />;
};

export default Content;
