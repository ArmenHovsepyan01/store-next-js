import { UploadFile } from 'antd';

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
// TODO: createdAt
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

export interface CartItem {
  count: number;
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
  categoryId: string | number;
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
  main_img: string;
  images: ImagesArrayItem[];
  colors?: string;
  sizes?: string[];
  user_id?: number;
}

interface ImagesArrayItem {
  id: number;
  image_url: string;
  productId: number;
}
