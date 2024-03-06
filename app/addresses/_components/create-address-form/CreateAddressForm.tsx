'use client';

import React from 'react';
import { Form, Select, Input, Button, Flex } from 'antd';

import { countries } from 'countries-list';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { addAddress, setAddresses } from '@/app/lib/store/features/user/userSlice';

interface FormValues {
  city: string;
  country: string;
  state: string;
  street_address: string;
  zip_code: string;
}

interface ICreateAddressForm {}

const CreateAddressForm = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const createAddress = async (values: FormValues) => {
    try {
      const { data } = await axios.post('/api/addresses', values, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      dispatch(
        addAddress({
          address: data.data
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form form={form} onFinish={createAddress} layout={'vertical'} style={{ width: 300 }}>
      <Form.Item>
        <h3 style={{ textAlign: 'center' }}>Create Address</h3>
      </Form.Item>
      <Form.Item
        name={'country'}
        label={'Country'}
        rules={[{ required: true, message: 'Please select country.' }]}>
        <Select placeholder={'Choose country'} style={{ minWidth: 120 }}>
          {Object.keys(countries).map((key, i) => {
            return (
              // @ts-ignore
              <Select.Option key={i} value={countries[key].name}>
                {countries[key].name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={'state'}
        label={'State'}
        rules={[{ required: true, message: 'Please type your state.' }]}>
        <Input placeholder={'Type state'} />
      </Form.Item>
      <Form.Item
        name={'city'}
        label={'City'}
        rules={[{ required: true, message: 'Please type your city.' }]}>
        <Input placeholder={'Type city'} />
      </Form.Item>
      <Form.Item
        name={'zip_code'}
        label={'Zip code'}
        rules={[{ required: true, message: 'Please type your province zip code.' }]}>
        <Input placeholder={'Type zip code'} type={'number'} />
      </Form.Item>
      <Form.Item
        name={'street_address'}
        label={'Street address'}
        rules={[{ required: true, message: 'Please type your street address.' }]}>
        <Input placeholder={'Type street address'} />
      </Form.Item>

      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAddressForm;
