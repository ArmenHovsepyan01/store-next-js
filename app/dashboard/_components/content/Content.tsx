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
      <Products filterById={category} />
    </Flex>
  );
};

export default Content;
