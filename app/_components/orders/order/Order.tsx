import React, { FC } from 'react';
import { Button, Divider, Flex } from 'antd';
import { IProduct } from '@/app/lib/definitions';
import Image from 'next/image';
import Card from 'antd/lib/card/Card';
import Meta from 'antd/lib/card/Meta';
import { orderProducts } from '@/app/helpers/orderProducts';

type Product = {
  quantity: number;
} & IProduct[];

interface IOrder {
  order: {
    id: number;
    amount: number;
    currency: string;
    status: 'succeed' | 'failed';
    paid: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    products: Product;
  };
}

const Order: FC<IOrder> = ({ order }) => {
  const retryOrder = async () => {
    try {
      await orderProducts(order.id);
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  };

  return (
    <Flex style={{ width: '100%' }} vertical={true}>
      <Flex
        gap={12}
        align={'center'}
        style={{
          padding: 12,
          backgroundColor: '#eeeeee',
          minHeight: 50,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4
        }}
        justify={'space-between'}>
        <Flex gap={18}>
          <span>Total {order.amount / 100} $</span>
          <span>Order date {new Date(order.createdAt).toLocaleDateString()}</span>
        </Flex>
        <Flex align={'center'} gap={8}>
          <Flex align={'center'} justify={'center'} gap={8}>
            Status
            <span
              style={{
                backgroundColor: order.status === 'failed' ? 'red' : 'green',
                textAlign: 'center',
                color: 'white',
                padding: 4,
                borderRadius: 4
              }}>
              {order.status}
            </span>
          </Flex>
          {order.status === 'failed' && <Button onClick={() => retryOrder()}>Retry</Button>}
        </Flex>
      </Flex>
      <Flex
        gap={14}
        style={{
          padding: 12,
          backgroundColor: '#f8f6f6',
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4
        }}
        wrap={'wrap'}>
        {order.products.map((product) => (
          <Card
            key={product.id}
            style={{ width: 220 }}
            cover={
              <div style={{ width: '100%', height: 170, position: 'relative' }}>
                <Image
                  alt="example"
                  src={`api/${product.main_img}`}
                  fill={true}
                  quality={100}
                  unoptimized={true}
                  onError={(e) => {
                    setSrc(
                      'https://miro.medium.com/v2/resize:fit:1200/1*ylV603DJXpTpBsiGm4BcAQ.png'
                    );
                  }}
                />
              </div>
            }>
            <Meta
              title={<span style={{ textAlign: 'center' }}>{product.name}</span>}
              description={<span>Quantity X{product.quantity}</span>}
              style={{ padding: 4 }}
            />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default Order;
