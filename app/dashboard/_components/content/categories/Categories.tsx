'use client';

import React from 'react';

import { useAppSelector } from '@/app/lib/store/hooks';

import ProductInfo from '@/app/dashboard/_components/common/productInfo/ProductInfo';

const Categories = () => {
  const categories = useAppSelector((state) => state.productCategories.categories);

  return <ProductInfo items={categories} title={'Categories'} itemName={'category'} />;
};

export default Categories;
