'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/store/hooks';
import { CartItem } from '@/app/lib/definitions';

const CartBadge = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const [cartBadges, setCartBadges] = useState<number>(0);

  useEffect(() => {
    const countBadges = () => {
      return cart.reduce((aggr: number, item: CartItem) => {
        return (aggr += item.count);
      }, 0);
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartBadges(countBadges());
    }
  }, [cart]);

  return (
    <Link href={'/wishlist'}>
      <Badge count={cartBadges}>
        <ShoppingCartOutlined style={{ fontSize: 24, color: 'white' }} />
      </Badge>
    </Link>
  );
};

export default CartBadge;
