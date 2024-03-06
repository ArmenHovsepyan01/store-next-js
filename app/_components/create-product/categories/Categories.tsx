import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchProductCategories } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { Cascader, Empty, Form, Select } from 'antd';
import type { SelectProps } from 'antd';
import { undefined } from 'zod';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.productCategories.categories);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductCategories());
    })();
  }, []);

  const options = useMemo(() => {
    return categories.map((item) => {
      return {
        value: item.id,
        label: item.category
      };
    });
  }, [categories]);

  const createSelectionTree = (items: any) => {
    return items.map((category) => {
      const item = {
        value: category.id.toString(),
        label: category.category,
        children:
          category.subcategories.length > 0 ? createSelectionTree(category.subcategories) : null
      };

      return item;
    });
  };

  const items = createSelectionTree(categories);

  return (
    <Form.Item
      name="categoryId"
      label="Choose category"
      rules={[{ required: true, message: 'Please select category.' }]}>
      <Cascader
        options={items}
        placeholder={'Select category'}
        notFoundContent={options.length === 0 ? <Empty /> : ''}
        onChange={(info, key) => {
          console.log(info);
        }}
      />
    </Form.Item>
  );
};

export default Categories;
