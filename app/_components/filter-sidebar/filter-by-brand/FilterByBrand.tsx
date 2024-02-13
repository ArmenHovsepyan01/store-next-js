'use client';

import React, { FC, useState } from 'react';
import { Button, Flex, Input, Space } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterByBrandProps {
  closeFilterSideBar: () => void;
}

const FilterByBrand: FC<FilterByBrandProps> = ({ closeFilterSideBar }) => {
  const [brand, setBrand] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBrandValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const setParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set('brand', brand);

    if (brand.trim()) router.replace(`${pathname}?${params.toString()}`);
    closeFilterSideBar();
  };

  return (
    <Flex gap={12} vertical={true} style={{ marginTop: 12 }}>
      <h3>Brand</h3>
      <Space size={'small'}>
        <Input defaultValue={brand} onChange={handleBrandValueChange} />
        <Button type={'primary'} onClick={setParams}>
          Apply
        </Button>
      </Space>
    </Flex>
  );
};

export default FilterByBrand;
