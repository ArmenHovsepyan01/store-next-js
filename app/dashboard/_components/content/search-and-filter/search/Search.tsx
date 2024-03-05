import React, { FC, useEffect, useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { SearchOutlined } from '@ant-design/icons';

interface ISearch {
  setTitle: (title: string) => void;
}

const Search: FC<ISearch> = ({ setTitle }) => {
  const [value, setValue] = useState<string>('');

  const debounce = useDebouncedCallback((value: string) => {
    setTitle(value);
  }, 1000);

  const handleValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
    debounce(value);
  };

  const handleSearchButton = () => {
    setTitle(value);
  };

  return (
    <Flex style={{ width: '100%' }} gap={24}>
      <Input
        value={value}
        onChange={handleValueOnChange}
        prefix={<SearchOutlined />}
        placeholder={'Search products'}
      />
    </Flex>
  );
};

export default Search;
