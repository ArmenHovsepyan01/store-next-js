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
  product: Product;
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
