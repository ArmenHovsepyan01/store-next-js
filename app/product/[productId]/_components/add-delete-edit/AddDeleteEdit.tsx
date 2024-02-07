'use client';

import React, { FC, useState } from 'react';

import AddToCart from '@/app/product/[productId]/_components/add-to-cart/AddToCart';
import EditModal from '@/app/product/[productId]/_components/add-delete-edit/edit-modal/EditModal';

import { Button, Flex } from 'antd';
import { Product } from '@/app/lib/definitions';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { removeFromCart } from '@/app/lib/store/features/cart/cartSlice';

import axios from 'axios';

interface AddDeleteEditProps {
  product: Product;
}
const AddDeleteEdit: FC<AddDeleteEditProps> = ({ product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(`https://api.escuelajs.co/api/v1/products/${product.id}`);
      dispatch(removeFromCart({ id: product.id }));
      router.replace('/');
      router.refresh();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const openEditModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Flex justify={'space-between'} style={{ minWidth: 400 }}>
      <AddToCart product={product} />
      {user?.loggedIn && (
        <div>
          <Button type={'primary'} icon={<EditFilled />} onClick={openEditModal}>
            Edit
          </Button>
          <Button
            danger={true}
            type={'primary'}
            icon={<DeleteFilled />}
            onClick={deleteProduct}
            style={{ marginLeft: 12 }}>
            Delete
          </Button>
        </div>
      )}
      {isOpen && <EditModal closeModal={closeModal} />}
    </Flex>
  );
};

export default AddDeleteEdit;
