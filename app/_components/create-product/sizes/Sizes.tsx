import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Empty, Form, Select } from 'antd';
import { fetchProductSizes } from '@/app/lib/store/features/product-sizes/productSizesSlice';

const Sizes = () => {
  const dispatch = useAppDispatch();
  const sizes = useAppSelector((state) => state.productSizes.sizes);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductSizes());
    })();
  }, []);

  useEffect(() => {
    if (sizes.length > 0) {
      setOptions(
        sizes.map((item: any) => {
          return {
            value: item.id,
            label: item.size
          };
        })
      );
    }
  }, [sizes]);

  return (
    <Form.Item
      name="sizes"
      label="Choose size."
      rules={[{ required: true, message: 'Please select size.' }]}
    >
      <Select
        options={options}
        notFoundContent={options.length === 0 ? <Empty /> : ''}
        placeholder="Select size"
        style={{ textTransform: 'capitalize' }}
      />
    </Form.Item>
  );
};

export default Sizes;
