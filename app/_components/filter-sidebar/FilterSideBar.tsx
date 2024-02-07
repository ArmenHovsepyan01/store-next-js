'use client';
import React, { FC, useEffect, useRef } from 'react';

import styles from '../../styles/FilterSideBar.module.scss';
import { Button, Divider, Drawer, Flex, Menu, type MenuProps, Space } from 'antd';
import { CloseOutlined, MailOutlined } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterByPrice from '../filter-by-price/FilterByPrice';

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

const categoryMenuItems: CategoryMenuItem[] = [
  {
    id: 1,
    label: 'Clothes'
  },
  {
    id: 2,
    label: 'Electronics'
  },
  {
    id: 3,
    label: 'Furniture'
  },
  {
    id: 4,
    label: 'Shoes'
  },
  {
    id: 5,
    label: 'Miscellaneous'
  }
];

const FilterSideBar: FC<FilterSideBarProps> = ({ closeFilterSidebar, isOpen }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setCategoryMenuItem = () => {
    const items: MenuItem[] = [];

    categoryMenuItems.forEach(({ id, label }) => {
      items.push(getItem(label, id));
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
            }}>
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
              params.set('page', '1');
              replace(`${pathname}?${params.toString()}`);
              closeFilterSidebar();
            }}
          />
        </Flex>
        <Divider />
        <FilterByPrice closeFilterSideBar={closeFilterSidebar} />
      </Flex>
    </Drawer>
  );
};

export default FilterSideBar;
