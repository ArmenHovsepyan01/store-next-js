'use client';

import React, { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchAllProducts } from '@/app/lib/store/features/products/productsSlice';
import { Flex } from 'antd';
import ProductCart from '@/app/mystore/_components/mystore-products/product-cart/ProductCart';

interface MyStoreProductsProps {
  category?: string;
}

const MyStoreProducts: FC<MyStoreProductsProps> = ({ category }) => {
  const data = useAppSelector((state) => state.data.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch]);

  const products = useMemo(() => {
    if (category === '2') {
      return data.filter((product) => product.isPublished);
    } else if (category === '3') {
      return data.filter((product) => !product.isPublished);
    }

    return data;
  }, [category, data]);

  return (
    <Flex
      gap={24}
      style={{ padding: 24, overflowY: 'scroll', width: '100%' }}
      wrap={'wrap'}
      justify={'center'}>
      {products.length === 0 ? (
        <span>There is no products.</span>
      ) : (
        products.map((product) => {
          return <ProductCart product={product} key={product.id} />;
        })
      )}
    </Flex>
  );
};

export default MyStoreProducts;
