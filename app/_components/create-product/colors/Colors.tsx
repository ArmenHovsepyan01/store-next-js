import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Empty, Form, Select } from 'antd';
import { fetchProductColors } from '@/app/lib/store/features/product-colors/productColorsSlice';

const Colors = () => {
  const dispatch = useAppDispatch();
  const colors = useAppSelector((state) => state.productColors.colors);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductColors());
    })();
  }, []);

  useEffect(() => {
    if (colors.length > 0) {
      setOptions(
        colors.map((item: any) => {
          return {
            value: item.id,
            label: item.color
          };
        })
      );
    }
  }, [colors]);

  return (
    <Form.Item
      name="color"
      label={'Choose color'}
      rules={[{ required: true, message: 'Please select color.' }]}>
      <Select
        options={options}
        notFoundContent={options.length === 0 ? <Empty /> : ''}
        placeholder="Select color"
      />
    </Form.Item>
  );
};

export default Colors;
