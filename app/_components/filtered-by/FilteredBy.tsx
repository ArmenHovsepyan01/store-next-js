import React, { FC } from 'react';
import { SearchParams } from '@/app/lib/definitions';

interface IFilteredBy {
  searchParams?: SearchParams;
}

const FilteredBy: FC<IFilteredBy> = ({ searchParams }) => {
  if (searchParams) {
    const keys = Object.keys(searchParams);
  }

  return <div></div>;
};

export default FilteredBy;
