'use client';

import React, { FC, useState } from 'react';

import { Button, Drawer, Flex } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import MultipleSelect from '@/app/dashboard/_components/content/search-and-filter/filter/multiple-select/MultipleSelect';

import { setColor } from '@/app/lib/store/features/product-colors/productColorsSlice';
import { setSize } from '@/app/lib/store/features/product-sizes/productSizesSlice';
import { setCategory } from '@/app/lib/store/features/product-categories/productCategoriesSlice';

import ProductsFilter from '@/app/dashboard/_components/content/search-and-filter/filter/products-filter/ProductsFilter';

interface IFilter {
  togglePublishedButton: () => void;
  toggleUnpublishedButton: () => void;
  productsState: {
    publishedIsSelected: boolean;
    unpublishedIsSelected: boolean;
  };
  resetProductState: () => void;
}

const Filter: FC<IFilter> = ({
  togglePublishedButton,
  toggleUnpublishedButton,
  productsState,
  resetProductState
}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const categories = useAppSelector((state) => state.productCategories.categories);
  const sizes = useAppSelector((state) => state.productSizes.sizes);
  const colors = useAppSelector((state) => state.productColors.colors);

  const onClose = () => {
    setIsOpen(false);
  };

  const showDrawer = () => {
    setIsOpen(true);
  };

  const clearFilters = () => {
    const payload = {
      id: null
    };

    dispatch(setColor(payload));
    dispatch(setSize(payload));
    dispatch(setCategory(payload));

    resetProductState();

    onClose();
  };

  return (
    <>
      <Button onClick={showDrawer}>Filter</Button>
      <Drawer onClose={onClose} open={isOpen}>
        <Flex gap={24} vertical={true}>
          <MultipleSelect items={categories} itemName={'category'} />
          <MultipleSelect items={sizes} itemName={'size'} />
          <MultipleSelect items={colors} itemName={'color'} />

          <ProductsFilter
            productsState={productsState}
            togglePublishedButton={togglePublishedButton}
            toggleUnpublishedButton={toggleUnpublishedButton}
          />
          <Button onClick={clearFilters} style={{ width: 120 }}>
            Clear Filters
          </Button>
        </Flex>
      </Drawer>
    </>
  );
};

export default Filter;
