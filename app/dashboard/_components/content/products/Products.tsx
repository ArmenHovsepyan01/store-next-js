'use client';

import React, { FC, useEffect, useMemo } from 'react';
import { Flex, Space, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import {
  fetchAllProducts,
  fetchAllProductsForAdmin
} from '@/app/lib/store/features/products/productsSlice';
import ProductCart from '@/app/mystore/_components/mystore-products/product-cart/ProductCart';

import styles from '../../../../styles/DashboardProducts.module.scss';
import { createMutableActionQueue } from 'next/dist/shared/lib/router/action-queue';
import FilterTags from '@/app/dashboard/_components/content/filter-tags/FilterTags';

interface IProducts {
  filterById?: number;
}

const Products: FC<IProducts> = ({ filterById }) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.data.data);
  const category = useAppSelector((state) => state.productCategories.selected);
  const size = useAppSelector((state) => state.productSizes.selected);
  const color = useAppSelector((state) => state.productColors.selected);

  useEffect(() => {
    if (process.browser) {
      dispatch(fetchAllProductsForAdmin());
    }
  }, [dispatch]);

  const products = useMemo(() => {
    let filteredData = [];

    if (filterById === 2) {
      filteredData = data.filter((item) => item.isPublished);
    } else if (filterById === 3) {
      filteredData = data.filter((item) => !item.isPublished);
    } else {
      filteredData = data;
    }

    if (category) filteredData = filteredData.filter((item) => item.category_id === category);
    if (size)
      filteredData = filteredData.filter((item) => {
        if (item.sizes) {
          return item.sizes.some((sizeItem) => sizeItem.id === size);
        }
        return false;
      });

    if (color)
      return filteredData.filter((item) => {
        if (item.colors) {
          return item.colors.some((colorItem) => colorItem.id === color);
        }
        return false;
      });

    return filteredData;
  }, [data, filterById, category, size, color]);

  return (
    <>
      <Flex vertical={true} gap={12}>
        <h3>Products</h3>
        {(color || size || category) && <FilterTags />}
      </Flex>
      <Flex gap={16} className={styles.products}>
        {products.length === 0 ? (
          <Space>There is no products.</Space>
        ) : (
          <Flex
            align={'center'}
            justify={'space-between'}
            style={{
              width: '100%'
            }}>
            {products.map((item) => {
              return <ProductCart product={item} key={item.id} />;
            })}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Products;
