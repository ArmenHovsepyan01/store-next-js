import { FC, Suspense } from 'react';

import React from 'react';

import Products from '@/app/_components/products/Products';
import Loading from '@/app/loading';

import Slide from '@/app/_components/slide/Slide';

interface IHome {
  searchParams?: {
    categoryId?: string;
    page?: string;
    title?: string;
    productId?: string;
    price_min?: string;
    price_max?: string;
  };
}

const Home: FC<IHome> = ({ searchParams }) => {
  return (
    <>
      <Slide />
      <main style={{ marginTop: 40 }}>
        <Suspense fallback={<Loading />}>
          <Products searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
