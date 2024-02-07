import { MenuProps } from 'antd';
interface MenuItem {
  key: string;
  label: string;
}

export const categoryMenu: MenuItem[] = [
  {
    key: '1',
    label: 'Clothes'
  },
  {
    key: '2',
    label: 'Electronics'
  },
  {
    key: '3',
    label: 'Furniture'
  },
  {
    key: '4',
    label: 'Shoes'
  },
  {
    key: '5',
    label: 'Miscellaneous'
  }
];
