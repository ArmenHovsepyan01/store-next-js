'use client';

import React, { FC } from 'react';
import { Button, Flex, Menu, Space } from 'antd';
import { LoginOutlined, PoweroffOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/app/lib/store/hooks';
import Link from 'next/link';

interface IDropdownMenu {
  logoutUser: () => void;
}

const DropdownMenu: FC<IDropdownMenu> = ({ logoutUser }) => {
  const user = useAppSelector((state) => state.user);

  return (
    <Flex
      vertical={true}
      justify={'center'}
      align={'center'}
      style={{ background: 'white', borderRadius: 4, padding: 12 }}>
      <h3 style={{ padding: 4 }}>
        {user.loggedIn ? `${user.firstName} ${user.lastName}` : 'Guest'}
      </h3>
      <Menu>
        {user.loggedIn ? (
          <>
            <Menu.Item>
              <Link href={'/mystore'}>
                <Space size={'small'}>
                  <ShoppingCartOutlined />
                  My Store
                </Space>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={logoutUser}>
                <PoweroffOutlined className="icon" />
                Log out
              </Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item>
              <Link href={'/login'}>
                <Space size={'small'}>
                  <LoginOutlined />
                  <span>Log in</span>
                </Space>
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Flex>
  );
};

export default DropdownMenu;
