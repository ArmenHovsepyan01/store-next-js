'use client';

import React, { FC, useEffect } from 'react';
import styles from '../../../../styles/Dropdown.module.scss';
import { Button, Flex } from 'antd';
import Cookies from 'js-cookie';
import { fetchUserData, setUser } from '@/app/lib/store/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface IDropdown {
  closeDropdownMenu: () => void;
}

const Dropdown: FC<IDropdown> = ({ closeDropdownMenu }) => {
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
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
    dispatch(
      setUser({
        loggedIn: false
      })
    );

    replace('/');
    window.location.reload();
  };

  return user.loggedIn ? (
    <Flex className={styles.dropdown} align={'center'} justify={'center'} vertical={true} gap={12}>
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
      <Button
        onClick={() => {
          closeDropdownMenu();
          replace('/mystore');
        }}>
        My Store
      </Button>
      <Button onClick={logoutUser}>Log out</Button>
    </Flex>
  ) : (
    <></>
  );
};

export default Dropdown;
