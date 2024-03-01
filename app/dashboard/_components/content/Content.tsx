import React, { FC } from 'react';

import { Flex } from 'antd';

import styles from '@/app/styles/Dashboard.module.scss';

interface IContent {}

const Content: FC<IContent> = () => {
  return <Flex className={styles.dashboardContent}>Welcome Admin</Flex>;
};

export default Content;
