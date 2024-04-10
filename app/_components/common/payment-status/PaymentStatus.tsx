import React, { FC } from 'react';
import { Button, Flex } from 'antd';
import Link from 'next/link';

interface IPaymentStatus {
  status: 'succeeded' | 'failed';
}

const PaymentStatus: FC<IPaymentStatus> = ({ status }) => {
  return (
    <Flex style={{ height: '100vh', width: '100%' }}>
      <Flex
        vertical={true}
        gap={12}
        justify={'center'}
        align={'center'}
        style={{
          padding: 18,
          backgroundColor: '#eeeeee',
          borderRadius: 4,
          margin: 'auto'
        }}>
        <h3 style={{ color: status === 'succeeded' ? 'green' : 'red' }}>Payment {status}</h3>
        <Link href={'/'}>
          <Button>Go to Home</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default PaymentStatus;
