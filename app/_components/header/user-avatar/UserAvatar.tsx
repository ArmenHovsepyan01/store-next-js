'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Button, Space } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchUserData, setUser } from '@/app/lib/store/features/user/userSlice';
import { UserOutlined } from '@ant-design/icons';
import Dropdown from '@/app/_components/header/user-avatar/dropdown/Dropdown';

const UserAvatar = () => {
  const { replace } = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      if (typeof window !== 'undefined') {
        const token = Cookies.get('token');
        if (token) await dispatch(fetchUserData());
      }
    })();
  }, [dispatch]);

  const navigateUser = () => {
    replace('/login');
  };

  const logoutUser = () => {
    Cookies.remove('token');
    dispatch(
      setUser({
        loggedIn: false
      })
    );

    replace('/');
    window.location.reload();
  };

  function toggleAvatar() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdownMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <Space>
        <Avatar
          size={34}
          icon={<UserOutlined />}
          style={{
            backgroundColor: 'white',
            color: 'black',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={toggleAvatar}
        />
      </Space>
      {isOpen && <Dropdown closeDropdownMenu={closeDropdownMenu} />}
    </>
  );
};

export default UserAvatar;
