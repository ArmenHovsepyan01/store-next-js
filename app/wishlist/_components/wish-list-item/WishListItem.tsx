'use client';

import React, { FC } from 'react';

import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Card from 'antd/lib/card/Card';

import Count from '@/app/wishlist/_components/count/Count';

import { CartItem } from '@/app/lib/definitions';
import { useAppDispatch } from '@/app/lib/store/hooks';
import {
  addToCart,
  decreaseCountOfProduct,
  removeFromCart
} from '@/app/lib/store/features/cart/cartSlice';

const WishListItem: FC<CartItem> = ({ count, product }) => {
  const { id, title, price, images } = product;
  const dispatch = useAppDispatch();

  const increaseProductCount = () => {
    dispatch(addToCart({ product: product }));
  };

  const decreaseProductCount = () => {
    if (count > 1) {
      dispatch(decreaseCountOfProduct({ id: id }));
    }
  };

  const totalPrice = price * count;

  return (
    <Card
      hoverable
      style={{ width: 280 }}
      actions={[
        <MinusOutlined key="minus" onClick={decreaseProductCount} />,
        <Count key="count" count={count} />,
        <PlusOutlined key="plus" onClick={increaseProductCount} />,
        <DeleteFilled
          key="delete"
          onClick={() => {
            dispatch(removeFromCart({ id: id }));
          }}
        />
      ]}
      cover={
        <Image
          alt="example"
          src={images[0]}
          fallback={'https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png'}
          preview={false}
        />
      }>
      <Meta title={title} description={`${totalPrice} $`} />
    </Card>
  );
};

export default WishListItem;
