import React, { FC } from 'react';
import { SearchParams } from '@/app/lib/definitions';

interface IFilteredBy {
  searchParams?: SearchParams;
}

const FilteredBy: FC<IFilteredBy> = ({ searchParams }) => {
  return <div></div>;
};

export default FilteredBy;
