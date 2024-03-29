'use client';

import React, { FC, useEffect } from 'react';

import { Flex, Select } from 'antd';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import {
  fetchProductColors,
  setColor
} from '@/app/lib/store/features/product-colors/productColorsSlice';

import {
  fetchProductSizes,
  setSize
} from '@/app/lib/store/features/product-sizes/productSizesSlice';

import CategoriesCascader from '@/app/_components/common/categories-cascader/CategoriesCascader';

interface IMultipleSelect {
  items: any;
  itemName: 'category' | 'size' | 'color';
}

const MultipleSelect: FC<IMultipleSelect> = ({ items, itemName }) => {
  const dispatch = useAppDispatch();

  const color = useAppSelector((state) => state.productColors.selected);
  const size = useAppSelector((state) => state.productSizes.selected);

  useEffect(() => {
    if (process.browser) {
      if (itemName === 'color') {
        dispatch(fetchProductColors());
      } else if (itemName === 'size') {
        dispatch(fetchProductSizes());
      }
    }
  }, [dispatch, itemName]);

  const setFilteredValue = (id: number | null) => {
    const payload = {
      id
    };

    if (itemName === 'size') return dispatch(setSize(payload));

    dispatch(setColor(payload));
  };

  const getTitle = (name: string) => {
    if (name === 'category') return 'categories';

    return name + 's';
  };

  const clearSelection = () => {
    const payload = {
      id: null
    };

    if (itemName === 'size') return dispatch(setSize(payload));

    dispatch(setColor(payload));
  };

  return (
    <Flex gap={12} vertical={true}>
      <span style={{ textTransform: 'capitalize', fontSize: 16 }}>{getTitle(itemName)}</span>
      {itemName === 'category' ? (
        <CategoriesCascader />
      ) : (
        <Select
          style={{ textTransform: 'capitalize' }}
          placeholder={`Choose ${itemName}`}
          onSelect={setFilteredValue}
          value={itemName === 'size' ? size : color}
          allowClear={true}
          onClear={clearSelection}>
          {items.map((item: any) => {
            return (
              <Select.Option
                key={item.id}
                value={item.id}
                style={{ textTransform: 'capitalize' }}
                slectable={true}>
                {item[itemName]}
              </Select.Option>
            );
          })}
        </Select>
      )}
    </Flex>
  );
};

export default MultipleSelect;
