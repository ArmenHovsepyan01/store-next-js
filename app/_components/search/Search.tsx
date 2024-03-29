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
      params.set('name', value);
      params.delete('page');
    } else {
      params.delete('name');
    }

    return replace(`${pathname}?${params.toString()}`);

    // replace(`/?${params.toString()}`);
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
