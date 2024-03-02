'use client';

import React, { useState } from 'react';

import Sider from 'antd/es/layout/Sider';
import { Flex, Layout, Menu } from 'antd';

import styles from '../styles/Mystore.module.scss';
import MyStoreProducts from '@/app/mystore/_components/mystore-products/MyStoreProducts';
import CreateProduct from '@/app/_components/create-product/CreateProduct';

const MyStore = () => {
  const [category, setCategory] = useState<string>('1');

  const menuItems = [
    {
      key: '1',
      label: 'All products'
    },
    {
      key: '2',
      label: 'Published products'
    },
    {
      key: '3',
      label: 'Unpublished products'
    },
    {
      key: '4',
      label: 'Create Product'
    }
  ];

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <Flex className={styles.mystore}>
      <Sider trigger={null} className={styles.sider}>
        <div className="demo-logo-vertical" />
        <h3 className={styles.title}>My Store</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[category]}
          items={menuItems}
          onClick={(e) => setCategory(e.key)}
        />
      </Sider>
      {category === '4' ? (
        <CreateProduct handleCategoryChange={handleCategoryChange} />
      ) : (
        <MyStoreProducts category={category} />
      )}
    </Flex>
  );
};

export default MyStore;
