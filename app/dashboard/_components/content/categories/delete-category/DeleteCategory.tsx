import React from 'react';
import { Button, message, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import {
  deleteCategory,
} from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteCategory = () => {
  const selectedCategory = useAppSelector((state) => state.productCategories.selected);

  const dispatch = useAppDispatch();

  const removeCategory = async (id: number) => {
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

  return (
    <Tooltip placement={'bottom'} title={'Delete chosen category.'}>
      <Button icon={<DeleteOutlined />} onClick={async () => {
        if(selectedCategory) await removeCategory(selectedCategory);
      }} disabled={!selectedCategory} danger={true} type={'primary'} />
    </Tooltip>
  );
};

export default DeleteCategory;
