'use client';

import { Pagination } from 'antd';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { FC } from 'react';

interface CustomPaginationProps {
  total: number;
}
const CustomPagination: FC<CustomPaginationProps> = ({ total }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pagesCount: number = Math.ceil(total / 6) * 10;
  const setCurrentPage = () => {
    const params = new URLSearchParams(searchParams);
    const page = params.get('page');
    if (!page) return 1;

    return +page;
  };

  const handlePageChanging = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      hideOnSinglePage
      defaultCurrent={setCurrentPage()}
      total={pagesCount}
      onChange={handlePageChanging}
    />
  );
};

export default CustomPagination;
