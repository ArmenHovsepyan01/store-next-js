'use client';

import React, { useState } from 'react';

import axios from 'axios';

import styles from '@/app/styles/CustomCard.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import { addToCart, removeFromCart } from '@/app/lib/store/features/cart/cartSlice';
import { message } from 'antd';
import Cookies from 'js-cookie';

interface IAddToCart {
  productId: number;
}

const AddToCart: React.FC<IAddToCart> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [isActive, setIsActive] = useState<boolean>(false);

  async function addProductToCart() {
    try {
      if (userId) {
        const { data } = await axios.post(
          'api/cart',
          {
            product_id: productId,
            user_id: userId
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`
            }
          }
        );

        dispatch(
          addToCart({
            cartItem: data
          })
        );

        message.success('You successfully added product to your cart.');
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async function removeProductFromCart() {
    try {
      const cartItem = cartItems.find((item) => {
        if (item.user_id === userId && item.product_id === productId) {
          return item;
        }
      });

      if (cartItem) {
        await axios.delete(`api/cart/${cartItem.id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });

        message.success(`You remove ${cartItem.Product.name} from cart.`);

        dispatch(
          removeFromCart({
            id: cartItem.id
          })
        );
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  const toggleCart = async () => {
    try {
      if (!isActive) {
        await addProductToCart();
      } else {
        await removeProductFromCart();
      }

      setIsActive((prev) => !prev);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <div>
      <ShoppingCartOutlined className={styles.addToCart} onClick={toggleCart} />
    </div>
  );
};

export default AddToCart;
