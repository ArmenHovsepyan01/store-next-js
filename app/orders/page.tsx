'use client';

import React from 'react';
import { Divider, Flex } from 'antd';
import useSWR from 'swr';
import { fetcher } from '@/app/helpers/helpers';
import Order from '@/app/_components/orders/order/Order';

const Page = () => {
  const { data, isLoading } = useSWR('/api/orders', fetcher);

  return (
    <Flex style={{ margin: '120px auto', width: 1500 }} vertical={true}>
      <h2>Orders</h2>
      <Divider />
      <Flex style={{ padding: 12 }} vertical={true} gap={12}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data.data.length === 0 ? (
              <Flex>You don't have any orders yet.</Flex>
            ) : (
              <>
                {data.data.map((item) => (
                  <Order order={item} key={item.id} />
                ))}
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Page;
