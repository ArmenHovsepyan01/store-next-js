'use client';

import React, { FC, useMemo, useState } from 'react';

import { Button, Flex, List, message, Skeleton } from 'antd';
import { CheckCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeAddress, setDefaultAddress } from '@/app/lib/store/features/user/userSlice';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { IAddress } from '@/app/lib/definitions';

import axios from 'axios';
import Cookies from 'js-cookie';
import CreateAddressForm from '@/app/addresses/_components/create-address-form/CreateAddressForm';

import styles from '../../../../../styles/ListItem.module.scss';
import { resolveAppleWebApp } from 'next/dist/lib/metadata/resolvers/resolve-basics';

interface IListItem {
  address: any;
}

const ListItem: FC<IListItem> = ({ address }) => {
  const dispatch = useAppDispatch();

  const userAddresses = useAppSelector((state) => state.user.addresses);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const generateAddress = (address: IAddress) => {
    return `${address.country}/${address.state}/${address.city}/${address.street_address}`;
  };

  const options = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    };
  }, []);

  const deleteAddress = async (id: number) => {
    try {
      const { data } = await axios.delete(`/api/addresses/${id}`, options);

      dispatch(
        removeAddress({
          id
        })
      );

      message.success(data.message);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const setAddressAsDefault = async () => {
    try {
      await axios.post(
        `/api/addresses/${address.id}`,
        {
          isDefault: true
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );

      dispatch(
        setDefaultAddress({
          id: address.id
        })
      );
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <>
      <List.Item
        actions={[
          address.isDefault ? <CheckCircleFilled /> : <></>,
          <Button key={'edit'} type={'primary'} icon={<EditOutlined />} onClick={openModal} />,
          <Button
            key={'delete'}
            type={'primary'}
            danger={true}
            icon={<DeleteOutlined />}
            onClick={() => {
              if (address.id) {
                deleteAddress(address.id);
              }
            }}
          />,
          !address.isDefault ? (
            <Button key={'set-as-default'} onClick={setAddressAsDefault}>
              Set as default
            </Button>
          ) : (
            <></>
          )
        ]}
        style={{ width: '100%' }}>
        <Skeleton
          loading={userAddresses.length <= 0}
          title={false}
          active={userAddresses.length <= 0}>
          <List.Item.Meta title={generateAddress(address)} key={address.id} />
        </Skeleton>
      </List.Item>

      {isOpen && (
        <Flex align={'center'} justify={'center'} className={styles.modal}>
          <CreateAddressForm closeEditModal={closeModal} address={address} />
        </Flex>
      )}
    </>
  );
};

export default ListItem;
