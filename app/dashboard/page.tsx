'use client';

import React, { useState } from 'react';
import { Button, Divider, Flex, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';

interface FormValues {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  images: string;
  main_image: string;
  brand: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<File[]>();

  async function createProduct(values: FormValues) {
    try {
      const formData = new FormData();
      formData.append('main_image', file, file?.name);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('categoryId', values.categoryId);
      formData.append('brand', values.brand);

      files?.forEach((item) => {
        formData.append('images', item, item.name);
      });

      const { data } = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);

      message.success('Product created successfully.');
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

  return (
    <main>
      <Flex align={'center'} justify={'space-between'} style={{ width: '100%' }}>
        <GoBackButton path={'/'} />
        <h3>Create Product</h3>
        <div></div>
      </Flex>
      <Divider />
      <Flex align={'center'} justify={'center'} vertical={true} gap={24}>
        <Form
          layout={'vertical'}
          form={form}
          onFinish={createProduct}
          style={{ width: 400 }}
          encType="multipart/form-data">
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
            label="Brand"
            rules={[{ required: true, message: 'Please fill the input.' }]}>
            <Input placeholder="Brand" />
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

          <Form.Item name="main_image" label="Main Image">
            <input
              type="file"
              onChange={(e) => {
                const inputFile = e.target.files?.[0];
                if (inputFile) {
                  setFile(inputFile);
                }
              }}
            />
          </Form.Item>

          <Form.Item name="images" label="Other images">
            <input
              type="file"
              multiple
              onChange={(e) => {
                const inputFiles = e.target.files;

                if (inputFiles?.length) {
                  const images = Array.from(inputFiles);
                  setFiles(images);
                }
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
