'use client';

import { FC } from 'react';
import { Button, message } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { IProduct, Product } from '@/app/lib/definitions';
import { addToFavorites } from '@/app/lib/store/features/favorites/favoritesSlice';
import { useAppDispatch } from '@/app/lib/store/hooks';
import Cookies from 'js-cookie';
import { resolveAppleWebApp } from 'next/dist/lib/metadata/resolvers/resolve-basics';
import axios from 'axios';
interface AddToCartProps {
  product: IProduct;
}

interface CartItem {
  count: number;
  product: Product;
}

const AddToFavorites: FC<AddToCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const addProductToCart = async () => {
    const token = Cookies.get('token');
    if (token) {
      await axios.post(
        '/api/favorites',
        {
          product_id: product.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }

    dispatch(addToFavorites({ product: product }));
    message.success('You successfully added product to your favorites.');
  };

  return (
    <Button type="primary" style={{ width: 150 }} icon={<HeartFilled />} onClick={addProductToCart}>
      Add to Favorites
    </Button>
  );
};

export default AddToFavorites;
