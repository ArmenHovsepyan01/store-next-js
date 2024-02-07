'use client';

import React, { FC, useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterByPriceProps {
  closeFilterSideBar: () => void;
}
const FilterByPrice: FC<FilterByPriceProps> = ({ closeFilterSideBar }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const initialParams = new URLSearchParams(searchParam);

  const [minPrice, setMinPrice] = useState<string>(initialParams.get('price_min') || '');
  const [maxPrice, setMaxPrice] = useState<string>(initialParams.get('price_max') || '');

  const changeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const changeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  return (
    <Flex vertical={true} gap={24}>
      <h3>Price</h3>
      <Flex gap={24}>
        <Input placeholder={'Min'} value={minPrice} onChange={changeMinPrice} type={'number'} />
        <Input placeholder={'Max'} value={maxPrice} onChange={changeMaxPrice} type={'number'} />
        <Button
          type={'primary'}
          onClick={() => {
            const params = new URLSearchParams(searchParam);

            if (minPrice.trim()) {
              params.set('price_min', minPrice);
            } else {
              params.delete('price_min');
            }

            if (maxPrice.trim()) {
              params.set('price_max', maxPrice);
            } else {
              params.delete('price_max');
            }

            replace(`${pathname}?${params.toString()}`);
            closeFilterSideBar();
          }}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};

export default FilterByPrice;
