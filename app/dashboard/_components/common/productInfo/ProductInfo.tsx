import React, { FC, ReactNode, useCallback, useState } from 'react';

import { Button, Checkbox, Collapse, Flex, message, Space, Tag, TreeSelect } from 'antd';

import styles from '@/app/styles/Dashboard.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import { deleteCategory } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { deleteColor } from '@/app/lib/store/features/product-colors/productColorsSlice';
import { deleteSize } from '@/app/lib/store/features/product-sizes/productSizesSlice';

import CreateItem from '@/app/dashboard/_components/common/productInfo/create-item/CreateItem';
import { DeleteOutlined } from '@ant-design/icons';
import ExtraIcons from '@/app/dashboard/_components/content/categories/extra-icons/ExtraIcons';

interface IProductInfo {
  items: any;
  title: string;
  itemName: 'color' | 'size' | 'category';
}

const ProductInfo: FC<IProductInfo> = ({ items, title, itemName }) => {
  const dispatch = useAppDispatch();

  const removeItem = useCallback(
    async (id: number, name: string) => {
      try {
        const { data } = await axios.delete(`api/${title.toLowerCase()}/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });

        const payload = {
          id
        };

        if (title.toLowerCase() === 'sizes') {
          dispatch(deleteSize(payload));
        } else {
          dispatch(deleteColor(payload));
        }

        message.success(
          data.message.includes('deleted')
            ? `${itemName} ${name} deleted successfully.`
            : data.message
        );
      } catch (e: any) {
        console.error(e);
        message.error(e.message);
      }
    },
    [dispatch, title, itemName]
  );

  function generateCollapseItems(data: any) {
    return data.map((item: any) => ({
      key: item.id.toString(),
      label: item.category,
      extra: <ExtraIcons id={item.id} />,
      children:
        item?.subcategories?.length > 0 ? (
          <Collapse
            items={generateCollapseItems(item.subcategories)}
            key={item.id}
            destroyInactivePanel={true}
          />
        ) : null
    }));
  }

  const collapseItems = itemName === 'category' ? generateCollapseItems(items) : null;

  console.log(collapseItems);

  return (
    <Flex justify={'center'}>
      <Flex className={styles.categories} justify={'space-between'} vertical={true} gap={24}>
        <Flex vertical={true} gap={12}>
          <h3 className={styles.title}>Create {itemName}</h3>
          <CreateItem itemName={itemName} endpoint={title.toLowerCase()} />
        </Flex>
        <Flex vertical={true} style={{ height: '100%' }} gap={12}>
          <h3>{title}</h3>
          {!collapseItems && (
            <Flex vertical={true} gap={12}>
              {items.length !== 0
                ? items.map((item: any) => {
                    return (
                      <Tag
                        color={'default'}
                        closable={true}
                        onClose={() => removeItem(item.id, item[itemName])}
                        key={item.id}
                        style={{
                          fontSize: 16,
                          padding: 8,
                          textTransform: 'capitalize',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          justifyContent: 'space-between',
                          minWidth: 120
                        }}>
                        {item[itemName]}
                      </Tag>
                    );
                  })
                : `${title} list are empty.`}
            </Flex>
          )}
          <Collapse items={collapseItems} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
