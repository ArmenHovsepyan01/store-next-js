import React, { FC } from 'react';

import { Button, Divider, Flex, Space } from 'antd';

import styles from '@/app/styles/Dashboard.module.scss';
import { DeleteFilled } from '@ant-design/icons';
import Categories from '@/app/dashboard/_components/content/categories/Categories';
import Sizes from '@/app/dashboard/_components/content/sizes/Sizes';
import Colors from '@/app/dashboard/_components/content/colors/Colors';
import Products from '@/app/dashboard/_components/content/products/Products';

interface IContent {
  category: number;
}

const Content: FC<IContent> = ({ category }) => {
  return (
    <Flex className={styles.dashboardContent} vertical={true}>
      <h3>Dashboard</h3>
      <Divider />
      <Flex
        gap={24}
        justify={'space-between'}
        align={'center'}
        style={{ width: '100%', flexWrap: 'wrap' }}
      >
        <Categories />
        <Sizes />
        <Colors />
      </Flex>
      <Divider />
      <Products filterById={category} />
    </Flex>
  );
};

export default Content;
