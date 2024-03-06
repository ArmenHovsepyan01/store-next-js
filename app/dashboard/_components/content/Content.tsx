import React, { FC } from 'react';

import { Flex } from 'antd';

import styles from '@/app/styles/Dashboard.module.scss';
import Products from '@/app/dashboard/_components/content/products/Products';

interface IContent {
  category: number;
}

const Content: FC<IContent> = ({ category }) => {
  return (
    <Flex className={styles.dashboardContent} vertical={true}>
      <Products filterById={category} />
    </Flex>
  );
};

export default Content;
