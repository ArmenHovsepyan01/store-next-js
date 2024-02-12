import { IData, IProduct, SearchParams } from '@/app/lib/definitions';

import { FC } from 'react';

import { Divider, Flex } from 'antd';

import CustomPagination from '@/app/_components/custom-pagination/CustomPagination';
import { getAllProducts } from '@/app/lib/data';
import ProductsHeader from '@/app/_components/products/products-header/ProductsHeader';
import CustomCard from '@/app/_components/custom-card/CustomCard';
import axios from 'axios';
import { AppleWebAppMeta } from 'next/dist/lib/metadata/generate/basic';

interface ProductsProps {
  searchParams?: SearchParams;
}

const Products: FC<ProductsProps> = async ({ searchParams }) => {
  const perPage: number = 6;
  const productsData = await getAllProducts(createParams());

  // const { data } = await axios.get('http://localhost:5000/api/products');

  function createParams(): string {
    let params = '';
    if (searchParams) {
      const keys = Object.keys(searchParams);

      keys.forEach((item, i) => {
        if (i === 0) {
          params += `${item}=${searchParams[item as keyof SearchParams]}`;
        } else {
          params += `&${item}=${searchParams[item as keyof SearchParams]}`;
        }
      });
    }

    return params;
  }

  return (
    <>
      <ProductsHeader />
      <Divider />
      <Flex gap={24} wrap="wrap" align="center" justify="space-between" style={{ padding: 24 }}>
        {productsData.length !== 0 ? (
          productsData?.map((item) => {
            return <CustomCard product={item} key={item.id} />;
          })
        ) : (
          <div>There is nothing.</div>
        )}
      </Flex>
      {/*<CustomPagination total={totalPages} />*/}
    </>
  );
};

export default Products;
