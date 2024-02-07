'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Card from 'antd/lib/card/Card';
import Image from 'next/image';
import Meta from 'antd/lib/card/Meta';
import { HeartFilled } from '@ant-design/icons';
import { CartItem, Product } from '@/app/lib/definitions';
import styles from '../../styles/CustomCard.module.scss';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { addToCart, removeFromCart } from '@/app/lib/store/features/cart/cartSlice';

interface CustomCardProps {
  product: Product;
}

const CustomCard: FC<CustomCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [src, setSrc] = useState(product.images[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartJSON = localStorage.getItem('cart');

    if (cartJSON) {
      const cart: CartItem[] = JSON.parse(cartJSON);
      const initialProduct = cart.find((item) => item?.product?.id === product.id);

      if (initialProduct) {
        setIsFavorite(true);
      }
    }
  }, []);

  const addProductToCart = () => {
    if (!isFavorite) {
      dispatch(addToCart({ product: product }));
    } else {
      dispatch(removeFromCart({ id: product.id }));
    }

    setIsFavorite((prev) => !prev);
  };

  return (
    <div className={styles.customCard}>
      <HeartFilled
        className={styles.addToCart}
        style={{ color: isFavorite ? 'red' : 'white' }}
        onClick={addProductToCart}
      />
      <Link href={`product/${product.id}`} key={product.id}>
        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <Image
              alt="example"
              src={src}
              width={280}
              height={300}
              quality={100}
              unoptimized={true}
              onError={(e) => {
                setSrc('https://miro.medium.com/v2/resize:fit:1200/1*ylV603DJXpTpBsiGm4BcAQ.png');
              }}
            />
          }>
          <Meta title={product.title} />
        </Card>
      </Link>
    </div>
  );
};

export default CustomCard;
