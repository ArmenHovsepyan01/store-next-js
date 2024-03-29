import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchProductCategories } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { Cascader, Empty, Form } from 'antd';
import { Category } from '@/app/lib/definitions';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.productCategories.categories);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductCategories());
    })();
  }, [dispatch]);

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

  return (
    <Form.Item
      name="categoryId"
      label="Choose category"
      rules={[{ required: true, message: 'Please select category.' }]}>
      <Cascader
        options={items}
        placeholder={'Select category'}
        notFoundContent={options.length === 0 ? <Empty /> : ''}
      />
    </Form.Item>
  );
};

export default Categories;
