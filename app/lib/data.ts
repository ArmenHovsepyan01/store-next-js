import axios from 'axios';
import { IProduct } from '@/app/lib/definitions';

export async function getAllProducts(query?: string, token?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  console.log(token);

  if (query) {
    url = `${url}?${query}`;
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.product as IProduct[];
  } catch (e: any) {
    throw new Error(e.message);
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
