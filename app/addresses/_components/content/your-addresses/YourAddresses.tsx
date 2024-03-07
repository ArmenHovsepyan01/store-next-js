'use client';

import React from 'react';
import { useAppSelector } from '@/app/lib/store/hooks';
import { Flex, List } from 'antd';
import ListItem from '@/app/addresses/_components/content/your-addresses/list-item/ListItem';

function DeleteFilled() {
  return null;
}

const YourAddresses = () => {
  const userAddresses = useAppSelector((state) => state.user.addresses);

  return (
    <Flex vertical={true} gap={24} style={{ minWidth: 500 }}>
      <h3>Addresses</h3>
      <Flex gap={12} vertical={true} justify={'center'}>
        <List
          bordered
          style={{ width: 800 }}
          itemLayout="horizontal"
          className="demo-loadmore-list"
          dataSource={userAddresses}
          renderItem={(item) => {
            return <ListItem address={item} key={item.id} />;
          }}
        />
      </Flex>
    </Flex>
  );
};

export default YourAddresses;
