import React, { FC } from 'react';
import { Category } from '@/app/lib/definitions';
import { Dropdown, MenuProps } from 'antd';

interface IMenuItems {
  category: Category;
  onCategoryClick: (key: number) => void;
}

const MenuItems: FC<IMenuItems> = ({ category, onCategoryClick }) => {
  function convertToTreeData(data: Category) {
    const items = {
      key: data.id.toString(),
      type: data.parent_id === null ? 'group' : 'sub menu',
      label: data.category,
      children:
        data.subcategories?.length > 0
          ? data.subcategories.map((item) => {
              const obj = convertToTreeData(item);
              return convertToTreeData(item);
            })
          : undefined
    };

    return items;
  }

  const items: MenuProps['items'] = [convertToTreeData(category)];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    onCategoryClick(+key);
  };

  return (
    <Dropdown
      menu={{ items, onClick }}
      overlayStyle={{ textTransform: 'capitalize' }}
      trigger={['click']}>
      <span style={{ textTransform: 'capitalize', cursor: 'pointer' }}>{category.category}</span>
    </Dropdown>
  );
};

export default MenuItems;
