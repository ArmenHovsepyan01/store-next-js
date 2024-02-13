'use client';

import React, { FC, useState } from 'react';
import { useAppSelector } from '@/app/lib/store/hooks';
import { Button, Flex, Select, Space } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterBySizeProps {
  closeFilterSideBar: () => void;
}

const FilterBySize: FC<FilterBySizeProps> = ({ closeFilterSideBar }) => {
  const sizes = useAppSelector((state) => state.productCategories.sizes);
  const [size, setSize] = useState<number[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectOptions = sizes.map((size, index) => {
    return {
      label: size,
      value: index
    };
  });

  const setSizes = () => {
    const params = new URLSearchParams(searchParams);
    let query = '';
    size.forEach((item, index) => {
      if (index === 0) {
        query += `${sizes[item]}`;
      } else {
        query += `&${sizes[item]}`;
      }
    });

    params.set('sizes', query);

    if (query.trim()) router.replace(`${pathname}?${params.toString()}`);

    closeFilterSideBar();
  };

  const handleSizeChanges = (values: number[]) => {
    setSize(values);
  };

  return (
    <Flex vertical={true} gap={12} style={{ marginTop: 12 }}>
      <h3>Sizes</h3>
      <Space>
        <Select
          mode={'multiple'}
          options={selectOptions}
          style={{ width: 190 }}
          placeholder={'Please choose size'}
          onChange={handleSizeChanges}
        />
        <Button type={'primary'} onClick={setSizes}>
          Apply
        </Button>
      </Space>
    </Flex>
  );
};

export default FilterBySize;
