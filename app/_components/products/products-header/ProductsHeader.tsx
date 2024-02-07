'use client';

import React, { useState } from 'react';
import { Button, Flex } from 'antd';
import dynamic from 'next/dynamic';

const FilterSideBar = dynamic(() => import('@/app/_components/filter-sidebar/FilterSideBar'), {
  ssr: false
});
const ProductsHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openFilterSidebar = () => {
    setIsOpen(true);
  };

  const closeFilterSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Flex justify={'space-between'} style={{ width: '100%' }}>
        <h1 style={{ textAlign: 'left', width: '100%' }}>Products</h1>
        <Button onClick={openFilterSidebar}>Filter</Button>
      </Flex>
      {isOpen && <FilterSideBar closeFilterSidebar={closeFilterSidebar} isOpen={isOpen} />}
    </>
  );
};

export default ProductsHeader;
