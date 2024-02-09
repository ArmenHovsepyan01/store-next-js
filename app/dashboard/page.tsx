'use client';

import React, { useState } from 'react';
import { Button, Divider, Flex, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';
import { log } from 'node:util';
import UploadFile from '@/app/_components/upload_file/UploadFile';

interface FormValues {
  name: string;
  price: string;
  description: string;
  category: string;
  images: string;
  main_image: string;
  brand: string;
}
const Dashboard = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState<string>('');

  async function createProduct(values: FormValues) {
    try {
      const formData = new FormData();
      formData.append('main_image', image);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('brand', values.brand);
      formData.append('images', JSON.stringify([image, image, image]));

      console.log(formData);

      const { data } = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);

      message.success('Product created successfully.');

      console.log(values, formData);
    } catch (e: any) {
      // setErrorMessage(e.response.data.message[0]);
      throw new Error(e);
    }
  }

  function clearFormValues() {
    form.setFieldsValue({
      title: '',
      price: '',
      description: '',
      category: '',
      images: ''
    });
  }

  const onImgChange = (url: string) => {
    setImage(url);
  };

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
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please fill the input.' }]}>
            <Input placeholder="Name" />
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
            name="brand"
            label="brand"
            rules={[{ required: true, message: 'Please fill the input.' }]}>
            <Input placeholder="Brand" />
          </Form.Item>
          <Form.Item
            name="category"
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

          <Form.Item>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </Form.Item>

          <Form.Item name="main_image" label="Main Image">
            <UploadFile setImage={onImgChange} />
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

      <img
        src={
          'C:\\\\Users\\\\user\\\\WebstormProjects\\\\store\\\\server\\\\images\\\\1707495850974.webp'
        }
        alt={'al'}
      />
    </main>
  );
};

export default Dashboard;
