import React, { FC } from 'react';
import { useAppDispatch } from '@/app/lib/store/hooks';
import {
  addToCart,
  decreaseCountOfProduct,
  removeFromCart
} from '@/app/lib/store/features/cart/cartSlice';

import Card from 'antd/lib/card/Card';
import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Count from '@/app/wishlist/_components/count/Count';
import { Image, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { CartItem } from '@/app/lib/definitions';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CartItemProps {
  cartItem: CartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { id, name, price, main_img } = cartItem.Product;
  const { quantity } = cartItem;
  const dispatch = useAppDispatch();

  const increaseProductCount = async () => {
    const postData = {
      product_id: id
    };

    await axios.post(`api/cart`, postData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });

    dispatch(addToCart({ cartItem }));
  };

  const decreaseProductCount = async () => {
    if (quantity > 1) {
      const postData = {
        product_id: id,
        decrease: true
      };

      await axios.post(`api/cart`, postData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      dispatch(decreaseCountOfProduct({ id: id }));
    }
  };

  const totalPrice = price * quantity;

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      actions={[
        <MinusOutlined key="minus" onClick={decreaseProductCount} />,
        <Count key="count" count={quantity} />,
        <PlusOutlined key="plus" onClick={increaseProductCount} />,
        <DeleteFilled
          key="delete"
          onClick={async () => {
            await axios.delete(`api/cart/${cartItem.id}`, {
              headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
              }
            });

            dispatch(
              removeFromCart({
                id: cartItem.id
              })
            );

            message.success(`You removed from cart ${name}`);
          }}
        />
      ]}
      cover={
        <Image
          style={{
            height: 220
          }}
          alt="example"
          src={`${process.env.NEXT_PUBLIC_API_URL}/${main_img}`}
          fallback={'https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png'}
          preview={false}
        />
      }>
      <Meta title={name} description={`${totalPrice} $`} />
    </Card>
  );
};

export default CartItem;
