'use client';

import React, { FC, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/lib/store/hooks';

import axios from 'axios';
import cheerio from 'cheerio';

import { Button, Flex, Form, Input, message, UploadFile } from 'antd';

import TextArea from 'antd/es/input/TextArea';

import { UploadChangeParam } from 'antd/es/upload';

import { FormValues } from '@/app/lib/definitions';

import { appendFormData } from '@/app/helpers/appendFormData';
import Upload from './upload/Upload';
import Categories from './categories/Categories';
import Sizes from './sizes/Sizes';

import Colors from './colors/Colors';
import { extractErrorMessage } from '@/app/helpers/extractErrorMessage';

interface CreateProductProps {
  handleCategoryChange: (category: string) => void;
}

const CreateProduct: FC<CreateProductProps> = ({ handleCategoryChange }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState<any>();
  const [file, setFile] = useState<UploadFile | null>();
  const user = useAppSelector((state) => state.user);

  async function createProduct(values: FormValues) {
    try {
      if (!file) return setErrorMessage('Please upload main image.');

      const formValues: FormValues = {
        ...values,
        main_image: file!,
        images: files!,
        user_id: user.id
      };

      const formData = appendFormData(formValues);

      const { data } = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      handleCategoryChange('1');

      message.success('Product created successfully.');
    } catch (e: any) {
      const errorMessage = extractErrorMessage(e);
      setErrorMessage(errorMessage);
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
    <Flex
      align={'center'}
      justify={'center'}
      vertical={true}
      gap={24}
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        width: '100%',
        overflow: 'auto'
      }}
    >
      <Form
        layout={'vertical'}
        form={form}
        onFinish={createProduct}
        style={{ width: 400, marginTop: 20 }}
        encType="multipart/form-data"
      >
        <Form.Item>
          <Flex justify={'center'} align={'center'} vertical={true}>
            <h3>Create Product</h3>
          </Flex>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please fill the input.' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please fill the input.' }]}
        >
          <TextArea placeholder="Descripton" autoSize />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please fill the input.' }]}
        >
          <Input placeholder="Price" type={'number'} />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: 'Please fill the input.' }]}
        >
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
        <Form.Item>{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}</Form.Item>
        <Form.Item>
          <Flex justify={'space-between'}>
            <Button type={'primary'} htmlType={'submit'}>
              Create
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default CreateProduct;
