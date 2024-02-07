import './Header.scss';

import { Flex, Space } from 'antd';
import Search from '@/app/_components/search/Search';
import Link from 'next/link';
import UserAvatar from '@/app/_components/header/user-avatar/UserAvatar';
import CartBadge from '@/app/_components/header/cart-badge/CartBadge';
import Categories from '@/app/_components/header/categories/Categories';

const Header = () => {
  return (
    <header className="header">
      <Flex gap={24} align={'center'} justify={'space-between'} style={{ height: '100%' }}>
        <Space size={'large'}>
          <Link href={'/'}>
            <span className="header-title">Products</span>
          </Link>
          <Categories />
        </Space>
        <Flex gap={24} align={'center'}>
          <Search />
          <CartBadge />
          <UserAvatar />
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
