'use client';

import React, { useEffect, useState } from 'react';
import { Flex, message } from 'antd';
import { categoryMenu } from '@/app/lib/dropdownMenus';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from '../../../styles/Categories.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchProductCategories } from '../../../lib/store/features/product-categories/productCategoriesSlice';

interface MenuItem {
  key: string;
  label: string;
}

const Categories = () => {
  const pathname = usePathname();
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
    const category: any = categories?.[key - 1];
    message.info(`You select ${category?.category}`);

    if (
      pathname.includes('product') ||
      pathname.includes('wishlist') ||
      pathname.includes('mystore')
    )
      return replace(`/?categoryId=${key}`);
    replace(`${pathname}?categoryId=${key}`);
  };

  return (
    <Flex gap={24} style={{ height: '100%' }} align={'center'}>
      {categories?.map((item) => {
        return (
          <div
            key={item.id}
            className={`${styles.category} ${item.id === +category ? styles.active : ''}`}
            onClick={() => onCategoryClick(item.id)}
          >
            {item.category}
          </div>
        );
      })}
    </Flex>
  );
};

export default Categories;
