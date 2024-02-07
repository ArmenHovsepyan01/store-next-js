'use client';

import React, { useState } from 'react';
import { Button, Divider, Flex, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';

interface FormValues {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  images: string;
}
const Dashboard = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');

  async function createProduct(values: FormValues) {
    try {
      const { data } = await axios.post(`https://api.escuelajs.co/api/v1/products/`, values);
      message.success(`You successfully created product.`);
      clearFormValues();
      router.replace('/');
      router.refresh();

      return data;
    } catch (e: any) {
      setErrorMessage(e.response.data.message[0]);
      throw new Error(e);
    }
  }

  function clearFormValues() {
    form.setFieldsValue({
      title: '',
      price: '',
      description: '',
      categoryId: '',
      images: ''
    });
  }

  return (
    <main>
      <Flex align={'center'} justify={'space-between'} style={{ width: '100%' }}>
        <GoBackButton path={'/'} />
        <h3>Create Product</h3>
        <div></div>
      </Flex>
      <Divider />
      <Flex align={'center'} justify={'center'} vertical={true} gap={24}>
        <Form layout={'vertical'} form={form} onFinish={createProduct} style={{ width: 400 }}>
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
          <Form.Item
            name="categoryId"
            label="Categories"
            rules={[{ required: true, message: 'Please fill the input.' }]}
            initialValue={'1'}>
            <Select
              options={[
                { value: '1', label: 'Clothes' },
                { value: '2', label: 'Electronics' },
                { value: '3', label: 'Furniture' },
                { value: '4', label: 'Shoes' },
                { value: '5', label: 'Miscellaneous' }
              ]}
            />
          </Form.Item>
          <Form.Item
            name="images"
            label="Image Url"
            rules={[{ required: true, message: 'Please fill the input.' }]}>
            <Input
              onChange={(e) => {
                const value = e.target.value;

                form.setFieldsValue({
                  images: [value]
                });
              }}
            />
          </Form.Item>

          <Form.Item>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </Form.Item>

          <Form.Item>
            <Flex justify={'space-between'}>
              <Button type={'primary'} htmlType={'submit'}>
                Create
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </main>
  );
};

export default Dashboard;
