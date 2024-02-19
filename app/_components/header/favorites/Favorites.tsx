'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/store/hooks';
import { FavoritesItem } from '@/app/lib/definitions';

const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const [favoritesBadges, setCartBadges] = useState<number>(0);

  useEffect(() => {
    const countBadges = () => {
      return favorites.reduce((aggr: number, item: FavoritesItem) => {
        return (aggr += item.count);
      }, 0);
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setCartBadges(countBadges());
    }
  }, [favorites]);

  return (
    <Link href={'/wishlist'}>
      <Badge count={favoritesBadges}>
        <HeartFilled style={{ fontSize: 24, color: 'white' }} />
      </Badge>
    </Link>
  );
};

export default Favorites;
