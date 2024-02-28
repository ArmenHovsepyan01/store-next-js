'use client';

import React, { FC } from 'react';

import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Card from 'antd/lib/card/Card';

import Count from '@/app/wishlist/_components/count/Count';

import { FavoritesItem } from '@/app/lib/definitions';
import { useAppDispatch } from '@/app/lib/store/hooks';
import {
  addToFavorites,
  decreaseCountOfProduct,
  removeFromFavorites
} from '@/app/lib/store/features/favorites/favoritesSlice';
import Cookies from 'js-cookie';
import axios from 'axios';

const WishListItem: FC<FavoritesItem> = ({ quantity, product }) => {
  const { id, name, price, images } = product;
  const dispatch = useAppDispatch();

  const token = Cookies.get('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const increaseProductCount = async () => {
    if (token) {
      await axios.post(
        '/api/favorites',
        {
          product_id: product.id
        },
        config
      );
    }
    dispatch(addToFavorites({ product: product }));
  };

  const decreaseProductCount = async () => {
    if (quantity > 1) {
      if (token) {
        await axios.post(
          '/api/favorites',
          {
            product_id: product.id,
            decrease: true
          },
          config
        );
      }
      dispatch(decreaseCountOfProduct({ id: id }));
    }
  };

  const deleteFromFavorites = async () => {
    if (token) {
      await axios.delete(`/api/favorites/${product.id}`, config);
    }
    dispatch(removeFromFavorites({ id: id }));
  };

  const totalPrice = price * quantity;

  return (
    <Card
      hoverable
      style={{ width: 280 }}
      actions={[
        <MinusOutlined key="minus" onClick={decreaseProductCount} />,
        <Count key="count" count={quantity} />,
        <PlusOutlined key="plus" onClick={increaseProductCount} />,
        <DeleteFilled key="delete" onClick={deleteFromFavorites} />
      ]}
      cover={
        <Image
          style={{ height: 240 }}
          alt="example"
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.main_img}`}
          fallback={'https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png'}
          preview={false}
        />
      }>
      <Meta title={name} description={`${totalPrice} $`} />
    </Card>
  );
};

export default WishListItem;
