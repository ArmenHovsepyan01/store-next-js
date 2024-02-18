'use client';

import React, { FC, useState } from 'react';

import EditModal from '@/app/product/[productId]/_components/add-delete-edit/edit-modal/EditModal';

import { Button, Flex, message } from 'antd';
import { IProduct, Product } from '@/app/lib/definitions';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { removeFromCart } from '@/app/lib/store/features/cart/cartSlice';
import Cookies from 'js-cookie';
import axios from 'axios';

interface AddDeleteEditProps {
  product: IProduct;
}
const AddDeleteEdit: FC<AddDeleteEditProps> = ({ product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      dispatch(removeFromCart({ id: product.id }));
      router.replace('/');
      router.refresh();
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

  const publishProduct = async () => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        },
        body: {
          isPublished: true
        }
      });

      // product.isPublished = false;
      message.success('You successfully published this product.');
      console.log(data);
    } catch (e) {
      message.success('Oops something gone wrong try again.');
      console.error(e);
    }
  };

  return (
    <Flex justify={'space-between'} style={{ minWidth: 400 }}>
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
      {!product.isPublished && <Button onClick={publishProduct}>Publish</Button>}
    </Flex>
  );
};

export default AddDeleteEdit;
