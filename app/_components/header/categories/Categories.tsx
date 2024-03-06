'use client';

import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from '../../../styles/Categories.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchProductCategories } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { Category } from '@/app/lib/definitions';
import MenuItems from '@/app/_components/header/categories/menu-items/MenuItems';

interface MenuItem {
  key: string;
  label: string;
}

const Categories = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [category, setCategory] = useState<number | string>('0');
  const params = new URLSearchParams(searchParams);
  const categories = useAppSelector((state) => state.productCategories.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      await dispatch(fetchProductCategories());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const categoryId = params.get('categoryId');
      if (!categoryId) {
        setCategory('0');
      } else {
        setCategory(categoryId);
      }
    }
  }, [params]);

  const onCategoryClick = (key: number) => {
    return replace(`/?categoryId=${key}`);
  };

  return (
    <Flex gap={24} style={{ height: '100%' }} align={'center'}>
      {categories?.map((item) => {
        return <MenuItems category={item} key={item.id} onCategoryClick={onCategoryClick} />;
      })}
    </Flex>
  );
};

export default Categories;
