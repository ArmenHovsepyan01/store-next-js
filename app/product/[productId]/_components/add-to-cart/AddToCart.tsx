'use client';

import { FC } from 'react';
import { Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from '@/app/lib/definitions';
import { addToCart } from '@/app/lib/store/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
interface AddToCartProps {
  product: Product;
}

interface CartItem {
  count: number;
  product: Product;
}

const AddToCart: FC<AddToCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const addProductToCart = () => {
    // addToCart(product.id.toString(), product);
    dispatch(addToCart({ product: product }));
    message.success('You successfully added product to your cart.');
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

export default AddToCart;
