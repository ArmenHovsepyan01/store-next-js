'use client';

import React, { FC, useState } from 'react';

import { Button, Flex, Input, message, Space } from 'antd';

import axios from 'axios';
import Cookies from 'js-cookie';

import { useAppDispatch } from '@/app/lib/store/hooks';

import { addColor } from '@/app/lib/store/features/product-colors/productColorsSlice';
import { addCategory } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { addSize } from '@/app/lib/store/features/product-sizes/productSizesSlice';

import styles from '../../../../../styles/Title.module.scss';

interface ICreateItem {
  itemName: 'color' | 'size' | 'category';
  endpoint: string;
}

const CreateItem: FC<ICreateItem> = ({ itemName, endpoint }) => {
  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const createItem = async () => {
    try {
      const body = {
        [itemName]: value
      };

      const { data } = await axios.post(`/api/${endpoint}`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      const payload = {
        item: data.data
      };

      if (itemName === 'color') {
        dispatch(addColor(payload));
      } else if (itemName === 'size') {
        dispatch(addSize(payload));
      } else {
        dispatch(addCategory(payload));
      }

      message.success(`${data.message}`);
      setValue('');
    } catch (e: any) {
      console.error(e);
      message.error(`${e.response.data.error}`);
    }
  };

  return (
    <Flex vertical={true}>
      <Space size={'large'}>
        <Input placeholder={`Type ${itemName}`} value={value} onChange={handleValueChange} />
        <Button type={'primary'} onClick={createItem}>
          Create
        </Button>
      </Space>
    </Flex>
  );
};

export default CreateItem;
