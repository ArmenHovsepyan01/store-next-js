'use client';
import { Input } from 'antd';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchByCategories = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('title', value);
      params.delete('page');
      console.log(params.toString());
    } else {
      params.delete('title');
    }

    if (pathname.includes('product') || pathname.includes('wishlist'))
      return replace(`/?${params.toString()}`);
    replace(`${pathname}?${params.toString()}`);
  }, 1000);
  return (
    <Input
      onChange={searchByCategories}
      defaultValue={searchParams.get('title')?.toString()}
      style={{ width: 300 }}
      placeholder={'Search by title'}
    />
  );
};

export default Search;
