import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import axios from 'axios';

export const orderProducts = async (orderId?: number) => {
  try {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string);
    const token = Cookies.get('token');
    const { data } = await axios.post(
      `http://localhost:5000/api/payment`,
      {
        orderId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    stripe?.redirectToCheckout({
      sessionId: data.data.sessionId
    });
  } catch (e: any) {
    throw new Error(e);
  }
};
