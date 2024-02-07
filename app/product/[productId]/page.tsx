'use client';

import './style.scss';

import React, { FC, useEffect, useState } from 'react';

import { getProductById } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';

import { Flex } from 'antd';
import PreviewGroup from 'antd/lib/image/PreviewGroup';

import AddDeleteEdit from '@/app/product/[productId]/_components/add-delete-edit/AddDeleteEdit';
import GoBackButton from '@/app/_components/go-back-button/GoBackButton';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { setProduct } from '@/app/lib/store/features/product/product';
// import Image from 'next/image';
import { Image as AntImage } from 'antd';
import Loading from '@/app/product/[productId]/loading';

interface ProductById {
  params: {
    productId: string;
  };
}
const ProductById: FC<ProductById> = ({ params: { productId } }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const data: Product = await getProductById(productId);
        dispatch(setProduct({ product: data }));
        setLoading(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch, productId]);

  return (
    <main>
      {loading ? (
        <Flex gap={24}>
          <GoBackButton />
          <div className="image-slider">
            <Flex align={'center'} justify={'space-between'}>
              <PreviewGroup>
                <Flex vertical={true} align={'center'} justify={'center'} gap={24}>
                  <AntImage
                    alt="example"
                    src={product?.images?.[0]}
                    width={400}
                    height={400}
                    fallback={
                      'https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png'
                    }
                  />
                  <Flex justify={'space-between'} style={{ width: '100%' }}>
                    {product?.images?.map((item, i) => (
                      <AntImage
                        alt="example"
                        src={item}
                        width={100}
                        height={100}
                        key={i}
                        fallback={
                          'https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png'
                        }
                      />
                    ))}
                  </Flex>
                </Flex>
              </PreviewGroup>
            </Flex>
          </div>
          <Flex gap={24} vertical={true} className="product">
            <h2 className="product-title">{product.title}</h2>
            <span className="product-price">{product.price} &#36;</span>
            <p>{product.description}</p>
            <AddDeleteEdit product={product} />
          </Flex>
        </Flex>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default ProductById;
