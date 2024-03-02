import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchProductSizes } from '@/app/lib/store/features/product-sizes/productSizesSlice';
import ProductInfo from '@/app/dashboard/_components/common/productInfo/ProductInfo';

const Sizes = () => {
  const sizes = useAppSelector((state) => state.productSizes.sizes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (process.browser) {
      dispatch(fetchProductSizes());
    }
  }, [dispatch]);

  return <ProductInfo items={sizes} title={'Sizes'} itemName={'size'} />;
};

export default Sizes;
