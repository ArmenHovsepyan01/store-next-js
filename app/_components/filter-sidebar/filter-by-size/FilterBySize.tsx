'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Button, Flex, Select, Space } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchProductSizes } from '@/app/lib/store/features/product-sizes/productSizesSlice';

interface FilterBySizeProps {
  closeFilterSideBar: () => void;
}

const FilterBySize: FC<FilterBySizeProps> = ({ closeFilterSideBar }) => {
  const sizes: any = useAppSelector((state) => state.productSizes.sizes);
  const [size, setSize] = useState<number[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductSizes());
    })();
  }, []);

  const sizeOptions = useMemo(() => {
    return sizes.map((item: any) => {
      return {
        label: item.size,
        value: item.id
      };
    });
  }, [sizes]);

  const setSizes = () => {
    const params = new URLSearchParams(searchParams);
    let query = '';
    size.forEach((item, index) => {
      if (index === 0) {
        query += `${sizes[item - 1].size}`;
      } else {
        query += `&${sizes[item - 1].size}`;
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
          options={sizeOptions}
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
