'use client';

import React, { FC } from 'react';

import { Button, Divider, Drawer, Flex, Menu, type MenuProps, Space } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterByPrice from '../filter-by-price/FilterByPrice';
import FilterByBrand from '@/app/_components/filter-sidebar/filter-by-brand/FilterByBrand';
import FilterBySize from '@/app/_components/filter-sidebar/filter-by-size/FilterBySize';
import { useAppSelector } from '@/app/lib/store/hooks';

interface FilterSideBarProps {
  closeFilterSidebar: () => void;
  isOpen: boolean;
}

interface CategoryMenuItem {
  id: number;
  label: string;
}

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const FilterSideBar: FC<FilterSideBarProps> = ({ closeFilterSidebar, isOpen }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categories = useAppSelector((state) => state.productCategories.categories);
  const { replace } = useRouter();

  const setCategoryMenuItem = () => {
    const items: MenuItem[] = [];

    categories.forEach(({ id, category }) => {
      category = category.slice(0, 1).toUpperCase() + category.slice(1);
      items.push(getItem(category, id));
    });

    return items;
  };

  const menuCategories = setCategoryMenuItem();

  const items: MenuItem[] = [getItem('Categories', 'sub1', <MailOutlined />, menuCategories)];

  const defaultCategory: string = searchParams.get('categoryId') || '1';

  return (
    <Drawer onClose={closeFilterSidebar} open={isOpen}>
      <Flex justify="space-between">
        <h2>Filter</h2>
        <Space>
          <Button
            onClick={() => {
              replace('/');
              closeFilterSidebar();
            }}
          >
            Clear All
          </Button>
        </Space>
      </Flex>
      <Divider />
      <Flex vertical={true}>
        <Flex vertical={true} gap={24}>
          <h3>Category</h3>
          <Menu
            defaultSelectedKeys={[defaultCategory]}
            mode="inline"
            items={items}
            onClick={(info) => {
              const params = new URLSearchParams(searchParams);
              params.set('categoryId', info.key);
              replace(`${pathname}?${params.toString()}`);
              closeFilterSidebar();
            }}
          />
        </Flex>
        <Divider />
        <FilterByPrice closeFilterSideBar={closeFilterSidebar} />
        <FilterByBrand closeFilterSideBar={closeFilterSidebar} />
      </Flex>
    </Drawer>
  );
};

export default FilterSideBar;
