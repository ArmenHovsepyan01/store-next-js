import axios from 'axios';
import { IData } from '@/app/lib/definitions';

export async function getAllProducts(query?: string) {
  let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=6`;
  let allDataUrl = `https://api.escuelajs.co/api/v1/products`;

  if (query) {
    url = `https://api.escuelajs.co/api/v1/products/?${query}`;
    allDataUrl = `${allDataUrl}?${query?.slice(0, query?.lastIndexOf('&offset'))}`;
  }

  try {
    const [filteredData, allData] = await Promise.all([axios.get(url), axios.get(allDataUrl)]);
    const data: IData = {
      data: filteredData.data,
      totalPages: allData.data.length
    };

    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getProductById(id: string) {
  try {
    const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    return data;
  } catch (e: any) {
    console.error(e.message);
  }
}
