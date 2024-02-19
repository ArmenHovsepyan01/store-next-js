'use client';

import React, { useMemo } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/store/hooks';

const CartBadge = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const userLoggedIn = useAppSelector((state) => state.user.loggedIn);

  const count = useMemo(() => {
    return cartItems.reduce((aggr, item) => {
      return aggr + item.quantity;
    }, 0);
  }, [cartItems]);

  return userLoggedIn ? (
    <div>
      <Link href={'/cart'}>
        <Badge count={count}>
          <ShoppingCartOutlined style={{ fontSize: 24, color: 'white' }} />
        </Badge>
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default CartBadge;
