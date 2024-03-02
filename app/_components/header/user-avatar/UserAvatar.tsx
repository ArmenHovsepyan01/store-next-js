'use client';

import React, { useEffect } from 'react';

import { Avatar, Button, Flex, MenuProps } from 'antd';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchUserData, setUser } from '@/app/lib/store/features/user/userSlice';
import {
  LoginOutlined,
  PoweroffOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Dropdown } from 'antd';

import Cookies from 'js-cookie';

const UserAvatar = () => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    (async function () {
      if (typeof window !== 'undefined') {
        const token = Cookies.get('token');
        if (token) await dispatch(fetchUserData());
      }
    })();
  }, [dispatch]);

  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('checked');
    dispatch(
      setUser({
        loggedIn: false
      })
    );

    replace('/');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Flex align={'center'} justify={'center'}>
          <h3>{user.loggedIn ? `${user.firstName} ${user.lastName}` : 'Guest'}</h3>
        </Flex>
      ),
      style: {
        backgroundColor: 'transparent',
        margin: 8
      }
    },
    {
      key: '2',
      label: (
        <>
          {user.role === 'admin' && user.loggedIn ? (
            <Flex align={'center'} justify={'center'}>
              <Link href={'/dashboard'}>
                <Button icon={<UserOutlined />}>Dashboard</Button>
              </Link>
            </Flex>
          ) : (
            <></>
          )}
        </>
      ),
      style: {
        backgroundColor: 'transparent',
        margin: 8
      }
    },
    {
      key: '3',
      label: (
        <>
          {user.loggedIn ? (
            <Flex align={'center'} justify={'center'}>
              <Link href={'/mystore'}>
                <Button icon={<ShoppingCartOutlined />}>My store</Button>
              </Link>
            </Flex>
          ) : (
            <></>
          )}
        </>
      )
    },
    {
      key: '4',
      label: (
        <Flex align={'center'} justify={'center'}>
          {user.loggedIn ? (
            <Button onClick={logoutUser} icon={<PoweroffOutlined className="icon" />}>
              Log out
            </Button>
          ) : (
            <Link href={'/login'}>
              <Button icon={<LoginOutlined />}>Log in</Button>
            </Link>
          )}
        </Flex>
      )
    }
  ];

  return (
    <Dropdown trigger={['click']} menu={{ items }} arrow>
      <Avatar
        size={34}
        icon={<UserOutlined />}
        style={{
          backgroundColor: 'white',
          color: 'black',
          cursor: 'pointer',
          position: 'relative'
        }}
      />
    </Dropdown>
  );
};

export default UserAvatar;
