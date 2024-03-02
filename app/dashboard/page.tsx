'use client';

import React, { useMemo, useState } from 'react';
import { Flex } from 'antd';

import styles from '../styles/Dashboard.module.scss';
import DashboardSider from '@/app/dashboard/_components/dashboard-sider/DashboardSider';
import Content from '@/app/dashboard/_components/content/Content';

const Dashboard = () => {
  const [category, setCategory] = useState<string>('');

  const handleChangeOfCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <Flex className={styles.dashboard}>
      <DashboardSider handleChangeOfCategory={handleChangeOfCategory} />
      <Content category={+category} />
    </Flex>
  );
};

export default Dashboard;
