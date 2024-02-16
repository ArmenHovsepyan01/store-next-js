'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Divider, Flex, Form, Input, message, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';
import { FormValues } from '@/app/lib/definitions';
import { appendFormData } from '@/app/helpers/appendFormData';
import axios from 'axios';
import Upload from '@/app/dashboard/_components/upload/Upload';
import { UploadChangeParam } from 'antd/es/upload';
import Categories from '@/app/dashboard/_components/categories/Categories';
import Sizes from '@/app/dashboard/_components/sizes/Sizes';
import Colors from '@/app/dashboard/_components/colors/Colors';

const Dashboard = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState<any>();
  const [file, setFile] = useState<UploadFile | null>();

  async function createProduct(values: FormValues) {
    try {
      const formValues: FormValues = {
        ...values,
        main_image: file!,
        images: files!
      };

      const formData = appendFormData(formValues);

      console.log(formValues, '-=-');

      const { data } = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(data);

      message.success('Product created successfully.');

      console.log(values);
    } catch (e: any) {
      console.log(e);
      setErrorMessage(e.message);
    }
  }

  const handleMainImageChanges = (e: UploadChangeParam<UploadFile<any>>) => {
    const inputFile = e.file.originFileObj;
    if (!file) {
      if (inputFile) {
        setFile(inputFile);
      }
    }
  };

  const handleOtherImageChanges = (e: UploadChangeParam<UploadFile<any>>) => {
    const inputFiles = e.fileList;

    if (inputFiles?.length) {
      const images = Array.from(inputFiles.map((file) => file.originFileObj));
      console.log(images);
      setFiles(images);
    }
  };

  const removeMainImage = (e: UploadFile<any>) => {
    setFile(null);
  };

  const removeImagesFromFiles = (e: UploadFile<any>) => {
    setFiles((prev: any[]) => {
      return prev.filter((file: any) => file.uid !== e?.originFileObj?.uid);
    });
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

          <Categories />

          <Sizes />

          <Colors />

          <Form.Item label="Main image">
            <Upload
              handleUploadChanges={handleMainImageChanges}
              removeFromFilesList={removeMainImage}
            />
          </Form.Item>

          <Form.Item name="images" label="Other images">
            <Upload
              handleUploadChanges={handleOtherImageChanges}
              removeFromFilesList={removeImagesFromFiles}
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
