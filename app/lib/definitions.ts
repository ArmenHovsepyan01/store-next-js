import { UploadFile } from 'antd';

export interface Category {
  id: number;
  category: string;
  parent_id?: number;
  subcategories: Category[];
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface IData {
  data: Product[];
  totalPages: number;
}

export interface SearchParams {
  categoryId?: string;
  page?: string;
  title?: string;
  productId?: string;
  price_min?: string;
  price_max?: string;
}

export interface FavoritesItem {
  id?: number;
  quantity: number;
  product: IProduct;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export interface FormValues {
  name: string;
  price: string;
  description: string;
  categoryId: (string | number)[] | number;
  main_image: UploadFile;
  brand: string;
  color: string | number;
  images: File[];
  sizes: string | number;
  user_id?: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  isPublished: boolean;
  category: string;
  category_id: number;
  main_img: string;
  images: ImagesArrayItem[];
  colors?: IColor[];
  sizes?: ISize[];
  user_id?: number;
}

interface ImagesArrayItem {
  id: number;
  image_url: string;
  productId: number;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  Product: IProduct;
}

export interface IColor {
  id: number;
  color: string;
  creationAt: string;
  updatedAt: string;
}

export interface ISize {
  id: number;
  size: string;
  creationAt: string;
  updatedAt: string;
}

export interface IAddress {
  id?: number;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  street_address: string;
  user_id?: number;
  createdAt?: string;
  updatedAt?: string;
}
