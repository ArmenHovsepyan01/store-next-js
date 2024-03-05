'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Badge } from 'antd';
import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { FavoritesItem } from '@/app/lib/definitions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setAllData } from '@/app/lib/store/features/favorites/favoritesSlice';

const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const [favoritesBadges, setCartBadges] = useState<number>(0);
  const fetchedData = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (process.browser && token && !fetchedData.current) {
      (async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        };

        try {
          const favoritesJSON = localStorage.getItem('favorites');
          const favorites = favoritesJSON ? JSON.parse(favoritesJSON) : null;

          if (favorites.length !== 0) {
            const { data } = await axios.post(
              '/api/favorites/sync',
              {
                favorites_data: favorites
              },
              config
            );

            fetchedData.current = true;

            dispatch(
              setAllData({
                data: data.data
              })
            );
          }
        } catch (e: any) {
          console.error(e);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const countBadges = () => {
      return favorites.reduce((aggr: number, item: FavoritesItem) => {
        return (aggr += item.quantity);
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
