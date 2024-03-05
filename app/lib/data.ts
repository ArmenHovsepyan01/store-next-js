import axios from 'axios';
import { IProduct } from '@/app/lib/definitions';

export async function getAllProducts(query?: string, token?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  if (query) {
    url = `${url}?${query}`;
  }

  try {
    const { data } = await axios.get(url);
    return data.product as IProduct[];
  } catch (e: any) {
    console.error(e.message);
  }
}

export async function getProductById(id: string) {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/product/${id}`);
    return data.product;
  } catch (e: any) {
    console.error(e.message);
  }
}
