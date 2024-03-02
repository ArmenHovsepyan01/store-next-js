import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import ProductInfo from '@/app/dashboard/_components/common/productInfo/ProductInfo';
import { fetchProductColors } from '@/app/lib/store/features/product-colors/productColorsSlice';

const Colors = () => {
  const colors = useAppSelector((state) => state.productColors.colors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (process.browser) {
      dispatch(fetchProductColors());
    }
  }, [dispatch]);

  return <ProductInfo items={colors} title={'Colors'} itemName={'color'} />;
};

export default Colors;
