'use client';

import React, { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

interface GoBackButtonProps {
  path?: string;
}
const GoBackButton: FC<GoBackButtonProps> = ({ path }) => {
  const router = useRouter();

  const goBack = () => {
    if (path) {
      return router.replace(path);
    }

    router.back();
  };

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      style={{
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        float: 'left'
      }}
      onClick={goBack}></Button>
  );
};

export default GoBackButton;
