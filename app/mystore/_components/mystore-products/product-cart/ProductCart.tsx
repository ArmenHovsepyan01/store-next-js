import React, { FC, useState } from 'react';
import { CheckCircleFilled, DeleteFilled, EditFilled } from '@ant-design/icons';
import { Image, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Card from 'antd/lib/card/Card';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { IProduct } from '@/app/lib/definitions';
import axios from 'axios';
import {
  deleteProductFromData,
  updateProduct
} from '@/app/lib/store/features/products/productsSlice';
import Cookies from 'js-cookie';
import EditModal from '@/app/product/[productId]/_components/add-delete-edit/edit-modal/EditModal';
import { publishCurrentProduct } from '@/app/lib/store/features/product/product';

interface ProductCartProps {
  product: IProduct;
}

const ProductCart: FC<ProductCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(`/api/product/${product.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      dispatch(deleteProductFromData({ id: product.id }));
      console.log(data);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const openEditModal = () => {
    setIsOpen(true);
  };

  const closeEditModal = () => {
    setIsOpen(false);
  };

  const publishProduct = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}`,
        {
          isPublished: true
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );

      message.success(`You successfully published ${product.name} product.`);
      dispatch(
        updateProduct({
          id: product.id,
          values: {
            isPublished: true
          }
        })
      );
      console.log(data);
    } catch (e) {
      message.warning('Oops something gone wrong try again.');
      console.error(e);
    }
  };
  const createCartActions = () => {
    const actions = [
      <DeleteFilled key="delete" onClick={deleteProduct} />,
      <EditFilled key={'edit'} onClick={openEditModal} />
    ];

    if (!product.isPublished) {
      actions.push(<CheckCircleFilled key={'publish'} onClick={publishProduct} />);
    }

    return actions;
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, height: 385 }}
        actions={createCartActions()}
        cover={
          <Image
            style={{
              height: 240
            }}
            alt="example"
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product.main_img}`}
            fallback={'https://miro.medium.com/v2/resize:fit:1358/1*ylV603DJXpTpBsiGm4BcAQ.png'}
            preview={false}
          />
        }>
        <Meta title={product.name} description={`${product.price} $`} />
      </Card>
      {isOpen && <EditModal closeModal={closeEditModal} currentProduct={product} />}
    </>
  );
};

export default ProductCart;
