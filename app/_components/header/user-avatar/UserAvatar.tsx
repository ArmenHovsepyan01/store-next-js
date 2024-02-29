'use client';

import React, { useEffect, useLayoutEffect } from 'react';

import { Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { fetchUserData, setUser } from '@/app/lib/store/features/user/userSlice';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import DropdownMenu from '@/app/_components/header/user-avatar/dropdown-menu/DropdownMenu';
import useDynamicAntDStyles from '@/app/hooks/useDynamicStyles';

const UserAvatar = () => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

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
    dispatch(
      setUser({
        loggedIn: false
      })
    );

    replace('/');
  };

  return (
    <Dropdown trigger={['click']} overlay={<DropdownMenu logoutUser={logoutUser} />} arrow>
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
