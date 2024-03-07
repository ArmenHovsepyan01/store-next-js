'use client';

import React, { FC } from 'react';
import { Form, Select, Input, Button, Flex } from 'antd';

import { countries } from 'countries-list';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { addAddress, updateAddress } from '@/app/lib/store/features/user/userSlice';
import { IAddress } from '@/app/lib/definitions';

interface FormValues {
  city: string;
  country: string;
  state: string;
  street_address: string;
  zip_code: string;
}

interface ICreateAddressForm {
  setCategory?: (category: string) => void;
  address?: IAddress;
  closeEditModal?: () => void;
}

const CreateAddressForm: FC<ICreateAddressForm> = ({ setCategory, address, closeEditModal }) => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<IAddress>();

  form.setFieldsValue({
    city: address ? address.city : '',
    country: address ? address.country : '',
    state: address ? address.state : '',
    street_address: address ? address.street_address : '',
    zip_code: address ? address.zip_code : ''
  });

  const createAddress = async (values: FormValues) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      };

      const url = address ? `api/addresses/${address.id}` : 'api/addresses';

      const { data } = await axios.post(url, values, options);

      if (address && closeEditModal) {
        dispatch(
          updateAddress({
            addresses: {
              ...values,
              id: address.id
            }
          })
        );

        return closeEditModal();
      }

      dispatch(
        addAddress({
          address: data.data
        })
      );

      if (setCategory) setCategory('1');
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
            // @ts-ignore
            const country = countries[key].name;

            return (
              <Select.Option key={i} value={country}>
                {country}
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
        <Flex justify={'space-between'}>
          <Button htmlType={'submit'} type={'primary'}>
            {address?.country ? 'Update' : 'Create'}
          </Button>
          <Button danger={true} type={'primary'} onClick={closeEditModal}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default CreateAddressForm;
