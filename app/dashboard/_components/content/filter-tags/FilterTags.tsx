import React, { FC, useMemo } from 'react';
import { Flex, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { setColor } from '@/app/lib/store/features/product-colors/productColorsSlice';
import { setSize } from '@/app/lib/store/features/product-sizes/productSizesSlice';
import { setCategory } from '@/app/lib/store/features/product-categories/productCategoriesSlice';

const FilterTags = () => {
  const dispatch = useAppDispatch();

  const colorState = useAppSelector((state) => state.productColors);
  const sizeState = useAppSelector((state) => state.productSizes);
  const categoryState = useAppSelector((state) => state.productCategories);

  const color = useMemo(() => {
    return colorState.colors.find((item) => item.id === colorState.selected);
  }, [colorState.selected, colorState.colors]);

  const size = useMemo(() => {
    return sizeState.sizes.find((item) => item.id === sizeState.selected);
  }, [sizeState.selected, sizeState.sizes]);

  const category = useMemo(() => {
    return categoryState.categories.find((item) => item.id === categoryState.selected);
  }, [categoryState.selected, categoryState.categories]);

  const resetAll = {
    id: null
  };

  if (!color && !size && !category) {
    return null;
  }

  return (
    <Flex
      gap={12}
      style={{
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8
      }}>
      <span>Filtered by:</span>
      {color && (
        <Tag
          color={color?.color || 'green-inverse'}
          onClose={() => dispatch(setColor(resetAll))}
          closable={true}>
          {`Color: ${color.color}`}
        </Tag>
      )}
      {size && (
        <Tag color={'green-inverse'} onClose={() => dispatch(setSize(resetAll))} closable={true}>
          {`Size: ${size.size}`}
        </Tag>
      )}
      {category && (
        <Tag
          color={'green-inverse'}
          onClose={() => dispatch(setCategory(resetAll))}
          closable={true}>
          {`Category: ${category.category}`}
        </Tag>
      )}
    </Flex>
  );
};

export default FilterTags;
