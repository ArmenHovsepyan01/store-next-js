'use client';

import React, { FC } from 'react';
import styles from '../../../../../styles/EditModal.module.scss';
import { Button, Flex, Form, Input } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { editCartProduct } from '@/app/lib/store/features/cart/cartSlice';
import { setProduct } from '@/app/lib/store/features/product/product';

interface FormValues {
  title: string;
  description: string;
  price: string;
}

interface EditModalProps {
  closeModal: () => void;
}

const EditModal: FC<EditModalProps> = ({ closeModal }) => {
  const [form] = Form.useForm<FormValues>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  form.setFieldsValue({
    title: product.title || '',
    description: product.description || '',
    price: product.price.toString() || ''
  });
  const editProduct = async (values: FormValues) => {
    try {
      const { data } = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        values
      );

      dispatch(setProduct({ product: data }));
      dispatch(editCartProduct({ product: data }));

      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex className={styles.editModal} align={'center'} justify={'center'} vertical={true} gap={24}>
      <h3>Edit Product</h3>
      <Form layout={'vertical'} form={form} onFinish={editProduct}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please fill the input.' }]}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please fill the input.' }]}>
          <TextArea placeholder="Descripton" autoSize />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please fill the input.' }]}>
          <Input placeholder="Price" type={'number'} />
        </Form.Item>
        <Form.Item>
          <Flex justify={'space-between'}>
            <Button type={'primary'} htmlType={'submit'}>
              Save
            </Button>
            <Button type={'primary'} danger={true} onClick={closeModal}>
              Cancel
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default EditModal;
