import axios from 'axios';
import Cookies from 'js-cookie';

export async function fetcher(url: string) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });

    return data;
  } catch (e) {
    throw new Error(e);
  }
}
