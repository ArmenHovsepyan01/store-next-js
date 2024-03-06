import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Button, Flex, List, message, Skeleton } from 'antd';
import { IAddress } from '@/app/lib/definitions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeAddress } from '@/app/lib/store/features/user/userSlice';

const YourAddresses = () => {
  const dispatch = useAppDispatch();

  const userAddresses = useAppSelector((state) => state.user.addresses);

  const generateAddress = (address: IAddress) => {
    return `${address.country}/${address.state}/${address.city}/${address.street_address}`;
  };

  const options = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    };
  }, []);

  const deleteAddress = async (id: number) => {
    try {
      const { data } = await axios.delete(`/api/addresses/${id}`, options);

      dispatch(
        removeAddress({
          id
        })
      );

      message.success(data.message);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  return (
    <Flex vertical={true} gap={24} style={{ minWidth: 500 }}>
      <h3>Addresses</h3>
      <Flex gap={12} vertical={true} justify={'center'}>
        <List
          bordered
          style={{ width: '100%' }}
          itemLayout="horizontal"
          className="demo-loadmore-list"
          dataSource={userAddresses}
          renderItem={(item) => {
            return (
              <List.Item
                actions={[
                  <Button
                    key={'edit'}
                    type={'primary'}
                    onClick={() => {
                      console.log(true);
                    }}>
                    edit
                  </Button>,
                  <Button
                    key={'delete'}
                    type={'primary'}
                    danger={true}
                    onClick={() => deleteAddress(item.id)}>
                    delete
                  </Button>
                ]}
                style={{ width: '100%' }}>
                <Skeleton
                  loading={userAddresses.length <= 0}
                  title={false}
                  active={userAddresses.length <= 0}>
                  <List.Item.Meta title={generateAddress(item)} key={item.id} />
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </Flex>
    </Flex>
  );
};

export default YourAddresses;
