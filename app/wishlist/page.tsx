'use client';

import { CartItem } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import { Divider, Flex } from 'antd';
import WishListItem from '@/app/wishlist/_components/wish-list-item/WishListItem';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';
import { useAppSelector } from '@/app/lib/store/hooks';

const WishList = () => {
  const products = useAppSelector((state) => state.cart.items);
  const [total, setTotal] = useState<number>(0);
  const countTotal = (products: CartItem[]) => {
    let total = 0;
    products.forEach((item: any) => {
      total += item.product.price * item.count;
    });

    return total;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTotal(countTotal(products));
    }
  }, [products]);

  return (
    <main>
      <Flex justify={'space-between'} align={'center'} style={{ width: '100%' }}>
        <GoBackButton />
        <h1>Favorites</h1>
        <h3>Total: ${total}</h3>
      </Flex>
      <Divider />
      <Flex gap={24} style={{ maxWidth: 888 }} wrap={'wrap'}>
        {products.length !== 0 ? (
          products.map(({ count, product }, i) => {
            return <WishListItem count={count} product={product} key={i} />;
          })
        ) : (
          <div>
            <h3>Wishlist is empty.</h3>
          </div>
        )}
      </Flex>
    </main>
  );
};

export default WishList;
