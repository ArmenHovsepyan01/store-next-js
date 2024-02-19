'use client';

import React, { useEffect, useMemo } from 'react';
import { Divider, Flex } from 'antd';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import { fetchCartItems } from '@/app/lib/store/features/cart/cartSlice';
import CartItem from '@/app/cart/_components/cart-item/CartItem';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    (async () => {
      await dispatch(fetchCartItems());
    })();
  }, []);

  const total = useMemo(() => {
    return cartItems.reduce((aggr, item) => {
      return aggr + item.quantity * item.Product.price;
    }, 0);
  }, [cartItems]);

  return (
    <main>
      <Flex justify={'space-between'} align={'center'} style={{ width: '100%' }}>
        <GoBackButton />
        <h1>Cart</h1>
        <h3>Total: ${total}</h3>
      </Flex>
      <Divider />
      <Flex gap={24} style={{ maxWidth: 888 }} wrap={'wrap'}>
        {cartItems.length !== 0 ? (
          cartItems.map((item, i) => {
            return <CartItem cartItem={item} key={i} />;
          })
        ) : (
          <div>
            <h3>Cart is empty.</h3>
          </div>
        )}
      </Flex>
    </main>
  );
};

export default Cart;
