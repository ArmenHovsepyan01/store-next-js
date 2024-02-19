import './Header.scss';

import { Flex, Space } from 'antd';
import Search from '@/app/_components/search/Search';
import Link from 'next/link';
import UserAvatar from '@/app/_components/header/user-avatar/UserAvatar';
import Favorites from '@/app/_components/header/favorites/Favorites';
import Categories from '@/app/_components/header/categories/Categories';
import CartBadge from '@/app/_components/header/cart-badge/CartBadge';

const Header = () => {
  return (
    <header className="header">
      <Flex gap={24} align={'center'} justify={'space-between'} style={{ height: '100%' }}>
        <Space size={'large'}>
          <a href={'/'}>
            <span className="header-title">Products</span>
          </a>
          <Categories />
        </Space>
        <Flex gap={24} align={'center'}>
          <Search />
          <Favorites />
          <CartBadge />
          <UserAvatar />
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
