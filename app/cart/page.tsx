'use client';

import React, { useEffect, useMemo } from 'react';
import { Button, Divider, Flex } from 'antd';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import { fetchCartItems } from '@/app/lib/store/features/cart/cartSlice';
import CartItem from '@/app/cart/_components/cart-item/CartItem';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
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
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string);

      const { data } = await axios.post(`http://localhost:5000/api/payment`, {
        products: cartItems
      });

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
        <h3>Total: ${total}</h3>
        <Button onClick={makePayment}>Pay</Button>
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
