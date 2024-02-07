'use client';

import React, { useEffect } from 'react';
import { Avatar, Button, Space } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchUserData, setUser } from '@/app/lib/store/features/user/userSlice';
import { UserOutlined } from '@ant-design/icons';

const UserAvatar = () => {
  const { replace } = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const token = Cookies.get('token');
      if (token) await dispatch(fetchUserData());
    })();
  }, [dispatch]);

  const navigateUser = () => {
    replace('/login');
  };

  console.log(user);
  const logoutUser = () => {
    Cookies.remove('token');
    dispatch(
      setUser({
        loggedIn: false,
        avatar: ''
      })
    );

    replace('/');
  };

  return (
    <Space>
      <Avatar
        size={34}
        src={user.avatar ? user.avatar : null}
        icon={<UserOutlined />}
        style={{ backgroundColor: 'white', color: 'black', cursor: 'pointer' }}
        onClick={navigateUser}
      />
      {user.loggedIn && <Button onClick={logoutUser}>Log out</Button>}
    </Space>
  );
};

export default UserAvatar;
