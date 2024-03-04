'use client';

import React, { FC, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchAllProducts } from '@/app/lib/store/features/products/productsSlice';
import ProductCart from '@/app/mystore/_components/mystore-products/product-cart/ProductCart';

import { Divider, Flex } from 'antd';

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
    <Flex vertical={true} style={{ padding: 24, width: '100%', marginLeft: 200 }}>
      <h3>Products</h3>
      <Divider />
      <Flex gap={24} wrap={'wrap'} style={{ marginBottom: 48, padding: 24 }}>
        {products.length === 0 ? (
          <span>There is no products.</span>
        ) : (
          products.map((product) => {
            return <ProductCart product={product} key={product.id} />;
          })
        )}
      </Flex>
    </Flex>
  );
};

export default MyStoreProducts;
