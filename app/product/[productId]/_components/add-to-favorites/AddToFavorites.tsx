'use client';

import { FC } from 'react';
import { Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { IProduct, Product } from '@/app/lib/definitions';
import { addToFavorites } from '@/app/lib/store/features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
interface AddToCartProps {
  product: IProduct;
}

interface CartItem {
  count: number;
  product: Product;
}

const AddToFavorites: FC<AddToCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const addProductToCart = () => {
    dispatch(addToFavorites({ product: product }));
    message.success('You successfully added product to your favorites.');
  };

  return (
    <Button
      type="primary"
      style={{ width: 150 }}
      icon={<ShoppingCartOutlined />}
      onClick={addProductToCart}>
      Add to cart
    </Button>
  );
};

export default AddToFavorites;
