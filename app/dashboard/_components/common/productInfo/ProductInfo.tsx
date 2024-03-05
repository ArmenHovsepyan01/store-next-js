import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button, Divider, Flex, Input, message, Select, Space, Tag } from 'antd';
import styles from '@/app/styles/Dashboard.module.scss';
import { AppstoreAddOutlined, SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  deleteCategory,
  setCategory
} from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { deleteColor, setColor } from '@/app/lib/store/features/product-colors/productColorsSlice';
import { deleteSize, setSize } from '@/app/lib/store/features/product-sizes/productSizesSlice';
import CreateItem from '@/app/dashboard/_components/common/productInfo/create-item/CreateItem';
import { walkTreeWithFlightRouterState } from 'next/dist/server/app-render/walk-tree-with-flight-router-state';

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

        if (title.toLowerCase() === 'categories') {
          dispatch(deleteCategory(payload));
        } else if (title.toLowerCase() === 'sizes') {
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

  return (
    <Flex justify={'center'}>
      <Flex className={styles.categories} justify={'space-between'} vertical={true} gap={24}>
        <Flex vertical={true} gap={12}>
          <h3 className={styles.title}>Create {itemName}</h3>
          <CreateItem itemName={itemName} endpoint={title.toLowerCase()} />
        </Flex>
        <Flex vertical={true} style={{ height: '100%' }} gap={12}>
          <h3>{title}</h3>
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
