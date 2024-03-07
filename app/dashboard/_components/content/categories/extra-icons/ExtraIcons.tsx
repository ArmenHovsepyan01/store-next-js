import React, { FC, useState } from 'react';
import { Button, Checkbox, message, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import {
  deleteCategory,
  setCategory
} from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import axios from 'axios';
import Cookies from 'js-cookie';

interface IExtraIcons {
  id: number;
}

const ExtraIcons: FC<IExtraIcons> = ({ id }) => {
  const selectedCategory = useAppSelector((state) => state.productCategories.selected);

  const dispatch = useAppDispatch();

  const removeCategory = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();

    try {
      const { data } = await axios.delete(`api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      dispatch(
        deleteCategory({
          id
        })
      );

      message.success(data.message);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const chooseCategory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();

    dispatch(
      setCategory({
        id
      })
    );
  };

  return (
    <Space size={'middle'}>
      <Button icon={<DeleteOutlined />} onClick={removeCategory} />
      <Checkbox checked={id === selectedCategory} onClick={chooseCategory} />
    </Space>
  );
};

export default ExtraIcons;
