'use client';

import React, { useEffect, useState } from 'react';
import CreateAddressForm from '@/app/addresses/_components/create-address-form/CreateAddressForm';
import { Flex, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

import styles from '../styles/Mystore.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import {
  fetchUserAddresses,
  setAddresses
} from '@/app/lib/store/features/addresses/addressesSlice';
import { log } from 'node:util';
import Content from '@/app/addresses/_components/content/Content';

const Page = () => {
  const dispatch = useAppDispatch();
  const userAddresses = useAppSelector((state) => state.user.addresses);
  const [category, setCategory] = useState<any>('1');

  useEffect(() => {
    if (!userAddresses) {
      setCategory('2');
    }
  }, [userAddresses]);

  const menuItems = [
    {
      key: '1',
      label: 'Your addresses'
    },
    {
      key: '2',
      label: 'Create address'
    }
  ];

  return (
    <Flex style={{ marginTop: 70 }}>
      <Sider trigger={null} className={styles.sider}>
        <h3 className={styles.title}>Addresses</h3>
        <Menu
          items={menuItems}
          theme={'dark'}
          onClick={(e) => setCategory(e.key)}
          selectedKeys={[category]}
        />
      </Sider>
      <main>
        <Content category={category} />
      </main>
    </Flex>
  );
};

export default Page;
