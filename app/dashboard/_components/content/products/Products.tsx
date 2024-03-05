'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Divider, Flex, Space, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import {
  fetchAllProducts,
  fetchAllProductsForAdmin
} from '@/app/lib/store/features/products/productsSlice';
import ProductCart from '@/app/mystore/_components/mystore-products/product-cart/ProductCart';

import styles from '../../../../styles/DashboardProducts.module.scss';
import { createMutableActionQueue } from 'next/dist/shared/lib/router/action-queue';
import FilterTags from '@/app/dashboard/_components/content/filter-tags/FilterTags';
import SearchAndFilter from '@/app/dashboard/_components/content/search-and-filter/SearchAndFilter';
import Categories from '@/app/dashboard/_components/content/categories/Categories';
import Sizes from '@/app/dashboard/_components/content/sizes/Sizes';
import Colors from '@/app/dashboard/_components/content/colors/Colors';

interface IProducts {
  filterById?: number;
}

const Products: FC<IProducts> = ({ filterById }) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.data.data);
  const category = useAppSelector((state) => state.productCategories.selected);
  const size = useAppSelector((state) => state.productSizes.selected);
  const color = useAppSelector((state) => state.productColors.selected);

  const [title, setTitle] = useState<string>('');
  const [productState, setProductState] = useState({
    publishedIsSelected: false,
    unpublishedIsSelected: false
  });

  useEffect(() => {
    if (process.browser) {
      dispatch(fetchAllProductsForAdmin());
    }
  }, [dispatch]);

  const products = useMemo(() => {
    let filteredData = data;

    if (title) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (productState.unpublishedIsSelected && !productState.publishedIsSelected) {
      filteredData = filteredData.filter((item) => !item.isPublished);
    } else if (productState.publishedIsSelected && !productState.unpublishedIsSelected) {
      filteredData = filteredData.filter((item) => item.isPublished);
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
  }, [data, category, size, color, title, productState]);

  const togglePublishedButton = () => {
    setProductState((prevState) => {
      return {
        ...prevState,
        publishedIsSelected: !prevState.publishedIsSelected
      };
    });
  };

  const toggleUnpublishedButton = () => {
    setProductState((prevState) => {
      return {
        ...prevState,
        unpublishedIsSelected: !prevState.unpublishedIsSelected
      };
    });
  };

  const resetProductState = () => {
    setProductState({
      publishedIsSelected: false,
      unpublishedIsSelected: false
    });
  };

  if (filterById === 2) return <Categories />;
  if (filterById === 3) return <Sizes />;
  if (filterById === 4) return <Colors />;

  return (
    <>
      <Flex vertical={true} gap={12}>
        <h3>All products</h3>
        <Divider />
        <SearchAndFilter
          resetProductState={resetProductState}
          setTitle={setTitle}
          togglePublishedButton={togglePublishedButton}
          toggleUnpublishedButton={toggleUnpublishedButton}
          productsState={productState}
        />
      </Flex>
      <Flex gap={16} className={styles.products}>
        {products.length === 0 ? (
          <Space>There is no products.</Space>
        ) : (
          <Flex
            align={'center'}
            gap={24}
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
