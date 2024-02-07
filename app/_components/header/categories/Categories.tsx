'use client';

import React, { useEffect, useState } from 'react';
import { Flex, message } from 'antd';
import { categoryMenu } from '@/app/lib/dropdownMenus';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from '../../../styles/Categories.module.scss';

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
  const onCategoryClick = (key: string) => {
    const category: MenuItem = categoryMenu?.[+key - 1];
    message.info(`You select ${category?.label}`);

    if (pathname.includes('product') || pathname.includes('wishlist'))
      return replace(`/?categoryId=${key}`);
    replace(`${pathname}?categoryId=${key}`);
  };

  return (
    <Flex gap={24} style={{ height: '100%' }} align={'center'}>
      {categoryMenu?.map((item) => {
        return (
          <div
            key={item.key}
            className={`${styles.category} ${item.key === category ? styles.active : ''}`}
            onClick={() => onCategoryClick(item.key)}>
            {item.label}
          </div>
        );
      })}
    </Flex>
  );
};

export default Categories;
