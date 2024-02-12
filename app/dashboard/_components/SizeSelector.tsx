import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';

const sizes = ['l', 'xl', 'xxl'];

const createSelectOptions = () => {
  const options: SelectProps['options'] = sizes.map((size, index) => {
    return {
      label: size,
      value: index
    };
  });

  return options;
};

interface SizeSelectorProps {
  setSizes: (size: string[]) => void;
}

const SizeSelector: FC<SizeSelectorProps> = ({ setSizes }) => {
  const handleChange = (values: number[]) => {
    const sizesArray = values.map((size) => {
      return sizes[size];
    });

    setSizes(sizesArray);
  };

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      onChange={handleChange}
      options={createSelectOptions()}
    />
  );
};

export default SizeSelector;
