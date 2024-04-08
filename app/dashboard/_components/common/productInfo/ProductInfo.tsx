import React, { FC,  useCallback} from 'react';

import { Flex, message, Tag, TreeSelect } from 'antd';

import styles from '@/app/styles/Dashboard.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';

import {  setCategory } from '@/app/lib/store/features/product-categories/productCategoriesSlice';
import { deleteColor } from '@/app/lib/store/features/product-colors/productColorsSlice';
import { deleteSize } from '@/app/lib/store/features/product-sizes/productSizesSlice';

import CreateItem from '@/app/dashboard/_components/common/productInfo/create-item/CreateItem';
import DeleteCategory from '@/app/dashboard/_components/content/categories/delete-category/DeleteCategory';
import { capitalize } from '@/app/helpers/capitalize';

interface IProductInfo {
  items: any;
  title: string;
  itemName: 'color' | 'size' | 'category';
}

const ProductInfo: FC<IProductInfo> = ({ items, title, itemName }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.productCategories.selected);

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

  function generateTreeData(data: any) {
    return data.map((item: any) => ({
      value:  item.id.toString(),
      title: capitalize(item.category),
      children:
        item?.subcategories?.length > 0 ? (
          generateTreeData(item.subcategories)
        ) : null
    }));
  }

  const getCategoryID = (id: number) => {
    dispatch(setCategory({
      id
    }))
  };

  const clearChoice = () => {
    dispatch(setCategory({
      id: null
    }))
  };

  const treeData = itemName === 'category' ? generateTreeData(items) : null;

  return (
    <Flex justify={'center'}>
      <Flex className={styles.categories} justify={'space-between'} vertical={true} gap={24}>
        <Flex vertical={true} gap={12}>
          <h3 className={styles.title}>Create {itemName}</h3>
          <CreateItem itemName={itemName} endpoint={title.toLowerCase()} />
        </Flex>
        <Flex vertical={true} style={{ height: '100%' }} gap={12}>
          <h3>{title}</h3>
          {!treeData && (
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
          {treeData && <Flex gap={12}>
            <TreeSelect size={'middle'} style={{width: '100%'}}
              value={selectedCategory}
              treeLine={true} treeData={treeData} allowClear
              onSelect={(info) => {
                if (info) getCategoryID(+info);
              }} onClear={clearChoice}
              placeholder={'Choose category and create subcategory for it'} />
            <DeleteCategory />
          </Flex>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
