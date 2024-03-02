import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchProductCategories } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { Empty, Form, Select } from 'antd';
import type { SelectProps } from 'antd';

const Categories = () => {
  const dispatch = useAppDispatch();
  const catgories = useAppSelector((state) => state.productCategories.categories);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(fetchProductCategories());
      setOptions(
        payload.categories.map((item: any) => {
          return {
            value: item.id,
            label: item.category
          };
        })
      );
    })();
  }, []);

  return (
    <Form.Item
      name="categoryId"
      label="Choose category"
      rules={[{ required: true, message: 'Please select category.' }]}
    >
      <Select
        options={options}
        notFoundContent={options.length === 0 ? <Empty /> : ''}
        placeholder="Select category"
        style={{ textTransform: 'capitalize' }}
      />
    </Form.Item>
  );
};

export default Categories;
