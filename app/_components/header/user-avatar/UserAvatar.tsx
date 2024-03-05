'use client';

import React, { useEffect } from 'react';

import { Avatar, Button, Flex, MenuProps, Space } from 'antd';

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
    console.log(true, 'logout');
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
      label: <h3>{user.loggedIn ? `${user.firstName} ${user.lastName}` : 'Guest'}</h3>,
      style: {
        backgroundColor: 'transparent',
        margin: 8
      }
    },
    {
      key: '2',
      icon: user.loggedIn ? <UserOutlined /> : <></>,
      label: (
        <>
          {user.role === 'admin' && user.loggedIn ? (
            <Link href={'/dashboard'}>
              <span>Dashboard</span>
            </Link>
          ) : (
            <></>
          )}
        </>
      )
    },
    {
      key: '3',
      icon: user.loggedIn ? <ShoppingCartOutlined /> : <></>,
      label: <>{user.loggedIn ? <Link href={'/mystore'}>My store</Link> : <></>}</>
    },
    {
      key: '4',
      icon: user.loggedIn ? <PoweroffOutlined className="icon" /> : <LoginOutlined />,
      label: user.loggedIn ? (
        <Link onClick={logoutUser} href={''}>
          Log out
        </Link>
      ) : (
        <Link href={'/login'}>Log in</Link>
      ),
      danger: user.loggedIn
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
