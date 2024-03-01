'use client';

import React, { FC, useMemo } from 'react';

import styles from '@/app/styles/Dashboard.module.scss';

import { Avatar, Flex, Menu, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { UserOutlined } from '@ant-design/icons';

interface IDashboardSider {
  handleChangeOfCategory: (category: string) => void;
}

const DashboardSider: FC<IDashboardSider> = ({ handleChangeOfCategory }) => {
  const menuItems = useMemo(() => {
    return [
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
        label: 'Categories'
      },
      {
        key: '5',
        label: 'Sizes'
      },
      {
        key: '6',
        label: 'Colors'
      }
    ];
  }, []);

  return (
    <Sider trigger={null} className={styles.dashboardSider}>
      <Flex vertical={true} justify={'center'} align={'center'} style={{ marginBottom: 24 }}>
        <Flex justify={'center'} align={'center'} gap={12}>
          <Avatar icon={<UserOutlined />} className={styles.dashboardSiderAvatar} />
          <span className={styles.dashboardSiderAvatarName}>Admin</span>
        </Flex>
      </Flex>
      <Menu
        items={menuItems}
        theme={'dark'}
        defaultSelectedKeys={['1']}
        onSelect={(value) => handleChangeOfCategory(menuItems[+value.key - 1].label)}
      />
    </Sider>
  );
};

export default DashboardSider;
