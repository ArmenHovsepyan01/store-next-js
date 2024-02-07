import { IData, SearchParams } from '@/app/lib/definitions';

import { FC } from 'react';

import { Divider, Flex } from 'antd';

import CustomPagination from '@/app/_components/custom-pagination/CustomPagination';
import { getAllProducts } from '@/app/lib/data';
import ProductsHeader from '@/app/_components/products/products-header/ProductsHeader';
import CustomCard from '@/app/_components/custom-card/CustomCard';

interface ProductsProps {
  searchParams?: SearchParams;
}

const Products: FC<ProductsProps> = async ({ searchParams }) => {
  const perPage: number = 6;
  const { data, totalPages }: IData = await getAllProducts(createParams());

  function createParams(): string {
    let params = '';
    if (searchParams) {
      const keys = Object.keys(searchParams);

      keys.forEach((item, i) => {
        if (item !== 'page') {
          params += `&${item}=${searchParams[item as keyof SearchParams]}`;
        }
      });

      params += `&offset=${searchParams.page && !searchParams.title ? (+searchParams.page - 1) * perPage : '0'}&limit=6`;
    }

    return params;
  }

  return (
    <>
      <ProductsHeader />
      <Divider />
      <Flex gap={24} wrap="wrap" align="center" justify="space-between" style={{ padding: 24 }}>
        {data.length !== 0 ? (
          data?.map((item) => {
            return <CustomCard product={item} key={item.id} />;
          })
        ) : (
          <div>There is nothing.</div>
        )}
      </Flex>
      <CustomPagination total={totalPages} />
    </>
  );
};

export default Products;
