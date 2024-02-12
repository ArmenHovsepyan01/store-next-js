'use client';

import React, { useState } from 'react';
import { Button, Divider, Flex, Form, Input, message, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';
import SizeSelector from '@/app/dashboard/_components/SizeSelector';
import CustomColorPicker from '@/app/dashboard/_components/cutom-color-picker/CustomColorPicker';
import { FormValues } from '@/app/lib/definitions';
import { appendFormData } from '@/app/helpers/appendFormData';
import axios from 'axios';

const Dashboard = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<File[]>();
  const [color, setColor] = useState<string>('#000000');
  const [sizes, setSizes] = useState<string[]>([]);

  async function createProduct(values: FormValues) {
    try {
      const formvalues: FormValues = {
        ...values,
        main_image: file!,
        images: files!,
        color: color,
        sizes: sizes
      };

      const formData = appendFormData(formvalues);

      const { data } = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);

      message.success('Product created successfully.');

      console.log(values);
    } catch (e: any) {
      // setErrorMessage(e.response.data.message[0]);
      throw new Error(e);
    }
  }

  const getColor = (color: string) => {
    return color;
  };

  function clearFormValues() {
    form.setFieldsValue({
      title: '',
      price: '',
      description: '',
      category: '',
      images: ''
    });
  }

  const handleSizesChange = (sizes: string[]) => {
    setSizes(sizes);
  };

  console.log(color);
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

          <Form.Item name="sizes" label="Choose sizes.">
            <SizeSelector setSizes={handleSizesChange} />
          </Form.Item>

          <Form.Item name="color" label={'Choose color'}>
            <CustomColorPicker color={color} setColor={setColor} />
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
