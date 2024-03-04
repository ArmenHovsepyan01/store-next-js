import React, { FC } from 'react';
import { Flex } from 'antd';
import Search from '@/app/dashboard/_components/content/search-and-filter/search/Search';
import Filter from '@/app/dashboard/_components/content/search-and-filter/filter/Filter';
import FilterTags from '@/app/dashboard/_components/content/filter-tags/FilterTags';

interface ISearchAndFilter {
  setTitle: (title: string) => void;
  togglePublishedButton: () => void;
  toggleUnpublishedButton: () => void;
  productsState: {
    publishedIsSelected: boolean;
    unpublishedIsSelected: boolean;
  };
  resetProductState: () => void;
  title: string;
}

const SearchAndFilter: FC<ISearchAndFilter> = ({
  setTitle,
  toggleUnpublishedButton,
  togglePublishedButton,
  productsState,
  resetProductState
}) => {
  return (
    <Flex gap={24} vertical={true}>
      <Flex gap={24}>
        <Search setTitle={setTitle} />
        <Filter
          resetProductState={resetProductState}
          productsState={productsState}
          toggleUnpublishedButton={toggleUnpublishedButton}
          togglePublishedButton={togglePublishedButton}
        />
      </Flex>
      <FilterTags />
    </Flex>
  );
};

export default SearchAndFilter;
