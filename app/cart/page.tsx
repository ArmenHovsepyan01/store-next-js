'use client';

import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import { Button, Divider, Flex } from 'antd';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';

import { fetchCartItems } from '@/app/lib/store/features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';

import CartItem from '@/app/cart/_components/cart-item/CartItem';
import axios from 'axios';
import Cookies from 'js-cookie';

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

  const makePayment = async () => {
    try {
      if (cartItems.length === 0) return;

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string);
      const token = Cookies.get('token');
      const { data } = await axios.post(
        `http://localhost:5000/api/payment`,
        {
          products: cartItems
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      stripe?.redirectToCheckout({
        sessionId: data.data.sessionId
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <main>
      <Flex justify={'space-between'} align={'center'} style={{ width: '100%' }}>
        <GoBackButton />
        <h1>Cart</h1>
        <Flex gap={12} align={'center'}>
          <h3>Total: ${total}</h3>
          <Button onClick={makePayment} disabled={Boolean(cartItems.length === 0)}>
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
