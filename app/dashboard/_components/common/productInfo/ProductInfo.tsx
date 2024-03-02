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

interface IProductInfo {
  items: any;
  title: string;
  itemName: 'color' | 'size' | 'category';
}

const ProductInfo: FC<IProductInfo> = ({ items, title, itemName }) => {
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState<string>('');

  const removeItem = useCallback(
    async (id: number) => {
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

        message.success(`${data.message}`);
        setSelectedValue('');
      } catch (e: any) {
        console.error(e);
        message.error(e.message);
      }
    },
    [dispatch, title]
  );

  return (
    <Flex align={'start'} justify={'center'} gap={12} vertical={true} className={styles.categories}>
      <h3>{title}</h3>
      <Space>
        <Select
          size={'large'}
          value={selectedValue ? selectedValue : `${title}`}
          placeholder={title}
          style={{
            width: 150,
            textTransform: 'capitalize'
          }}
          onSelect={(info) => {
            const value = items.find((item: any) => item.id === +info);
            setSelectedValue(value[itemName]);

            const payload = {
              id: +info
            };

            if (title.toLowerCase() === 'categories') {
              dispatch(setCategory(payload));
            } else if (title.toLowerCase() === 'sizes') {
              dispatch(setSize(payload));
            } else {
              dispatch(setColor(payload));
            }
          }}>
          {items.map((item: any) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                <Tag color={'default'} closable={true} onClose={() => removeItem(item.id)}>
                  {item[itemName]}
                </Tag>
              </Select.Option>
            );
          })}
        </Select>

        <Button
          disabled={!selectedValue}
          onClick={() => {
            setSelectedValue('');
            const payload = {
              id: null
            };

            if (title.toLowerCase() === 'categories') {
              dispatch(setCategory(payload));
            } else if (title.toLowerCase() === 'sizes') {
              dispatch(setSize(payload));
            } else {
              dispatch(setColor(payload));
            }
          }}>
          Clear filter
        </Button>
      </Space>

      <CreateItem itemName={itemName} endpoint={title.toLowerCase()} />
    </Flex>
  );
};

export default ProductInfo;
