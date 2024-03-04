import React, { FC, useState } from 'react';
import { Button, Flex, Space } from 'antd';

interface IProductsFilter {
  togglePublishedButton: () => void;
  toggleUnpublishedButton: () => void;
  productsState: {
    publishedIsSelected: boolean;
    unpublishedIsSelected: boolean;
  };
}

const ProductsFilter: FC<IProductsFilter> = ({
  toggleUnpublishedButton,
  togglePublishedButton,
  productsState
}) => {
  return (
    <Flex vertical={true} gap={12}>
      <span>Products</span>
      <Space size={'middle'}>
        <Button
          onClick={togglePublishedButton}
          type={productsState.publishedIsSelected ? 'primary' : 'default'}>
          Published
        </Button>
        <Button
          onClick={toggleUnpublishedButton}
          type={productsState.unpublishedIsSelected ? 'primary' : 'default'}>
          Unpublished
        </Button>
      </Space>
    </Flex>
  );
};

export default ProductsFilter;
