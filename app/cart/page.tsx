'use client';

import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import { Button, Divider, Flex, message } from 'antd';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';

import { fetchCartItems } from '@/app/lib/store/features/cart/cartSlice';

import CartItem from '@/app/cart/_components/cart-item/CartItem';

import { orderProducts } from '@/app/helpers/orderProducts';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const address = useAppSelector((state) => state.user.addresses);

  const defaultAddress = useMemo(() => {
    return address.filter((address) => address.isDefault);
  }, [address]);

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

  const createOrder = async () => {
    try {
      if (cartItems.length === 0 || !defaultAddress) return;

      await orderProducts();
    } catch (e: any) {
      console.error(e);
      message.error('Please select your address then make order.');
    }
  };

  return (
    <main>
      <Flex justify={'space-between'} align={'center'} style={{ width: '100%' }}>
        <GoBackButton />
        <h1>Cart</h1>
        <Flex gap={12} align={'center'}>
          <h3>Total: ${total}</h3>
          <Button onClick={() => createOrder()} disabled={Boolean(cartItems.length === 0)}>
            Pay
          </Button>
        </Flex>
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
