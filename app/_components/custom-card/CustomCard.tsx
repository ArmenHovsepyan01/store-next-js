'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Card from 'antd/lib/card/Card';
import Image from 'next/image';
import Meta from 'antd/lib/card/Meta';
import { HeartFilled } from '@ant-design/icons';
import { FavoritesItem, IProduct } from '@/app/lib/definitions';
import styles from '../../styles/CustomCard.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import {
  addToFavorites,
  removeFromFavorites
} from '@/app/lib/store/features/favorites/favoritesSlice';
import AddToCart from '@/app/_components/custom-card/add-to-cart/AddToCart';
import Cookies from 'js-cookie';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { message } from 'antd';
import axios from 'axios';
import { decryptActionBoundArgs } from 'next/dist/server/app-render/action-encryption';

interface CustomCardProps {
  product: IProduct;
  token?: RequestCookie;
}

const CustomCard: FC<CustomCardProps> = ({ product, token }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [src, setSrc] = useState(product.main_img);
  const isUserLoggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favoritesJSON = localStorage.getItem('favorites');

    if (favoritesJSON) {
      const cart: FavoritesItem[] = JSON.parse(favoritesJSON);
      const initialProduct = cart.find((item) => item?.product?.id === product.id);

      if (initialProduct) {
        setIsFavorite(true);
      }
    }
  }, []);

  const addProductToFavorites = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    };

    try {
      if (!isFavorite) {
        if (isUserLoggedIn) {
          await axios.post(
            '/api/favorites',
            {
              product_id: product.id
            },
            config
          );
        }

        dispatch(
          addToFavorites({
            product: {
              ...product
            }
          })
        );
      } else {
        if (isUserLoggedIn) await axios.delete(`/api/favorites/${product.id}`, config);
        dispatch(removeFromFavorites({ id: product.id }));
      }
      setIsFavorite((prev) => !prev);
    } catch (e) {
      message.error('Something gone wrong.');
    }
  };

  return (
    <div className={styles.customCard}>
      {product.isPublished && (
        <>
          <HeartFilled
            className={styles.addToFavorites}
            style={{ color: isFavorite ? 'red' : 'gray' }}
            onClick={addProductToFavorites}
          />
          {token && <AddToCart productId={product.id} />}
        </>
      )}
      <Link href={`product/${product.id}`} key={product.id}>
        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <Image
              alt="example"
              src={`api/${product.main_img}`}
              width={280}
              height={300}
              quality={100}
              unoptimized={true}
              onError={(e) => {
                setSrc('https://miro.medium.com/v2/resize:fit:1200/1*ylV603DJXpTpBsiGm4BcAQ.png');
              }}
            />
          }>
          <Meta title={product.name} />
        </Card>
      </Link>
    </div>
  );
};

export default CustomCard;
