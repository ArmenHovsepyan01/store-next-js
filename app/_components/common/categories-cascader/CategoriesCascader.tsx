import React, { useMemo } from 'react';
import { Cascader, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Category } from '@/app/lib/definitions';
import { setCategory } from '@/app/lib/store/features/product-categories/productCategoriesSlice';

const CategoriesCascader = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.productCategories.categories);

  const setCategoryID = (category: string) => {
    dispatch(
      setCategory({
        id: +category
      })
    );
  };

  const options = useMemo(() => {
    return categories.map((item) => {
      return {
        value: item.id,
        label: item.category
      };
    });
  }, [categories]);

  const createSelectionTree = (items: any) => {
    return items.map((category: Category) => {
      return {
        value: category.id.toString(),
        label: category.category,
        children:
          category.subcategories.length > 0 ? createSelectionTree(category.subcategories) : null
      };
    });
  };

  const items = createSelectionTree(categories);

  const clearSelection = () => {
    dispatch(
      setCategory({
        id: null
      })
    );
  };

  return (
    <Cascader
      style={{ width: '100%' }}
      options={items}
      placeholder={'Choose category'}
      notFoundContent={options.length === 0 ? <Empty /> : ''}
      onClear={clearSelection}
      onChange={(info) => {
        if (info) {
          setCategoryID(info[info.length - 1].toString());
        }
      }}
    />
  );
};

export default CategoriesCascader;
