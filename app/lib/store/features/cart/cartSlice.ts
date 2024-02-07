import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { CartItem, Product } from '@/app/lib/definitions';
import { startServer } from 'next/dist/server/lib/start-server';

interface Cart {
  items: CartItem[];
}

interface CartProduct {
  product: Product;
}
interface ProductID {
  id: number;
}

const loadInitialCartData = () => {
  if (process.browser) {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
  }
  return [];
};

const initialState: Cart = {
  items: loadInitialCartData()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const cartItem = state.items.find((item) => item.product.id === action.payload.product.id);
      if (cartItem) {
        state.items = state.items.map((item) => {
          if (item.product.id === action.payload.product.id) {
            return {
              ...item,
              count: item.count + 1
            };
          }

          return item;
        });
      } else {
        state.items.push({
          count: 1,
          product: action.payload.product
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductID>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload.id);
    },
    decreaseCountOfProduct: (state, action: PayloadAction<ProductID>) => {
      state.items = state.items.map((item) => {
        if (item.product.id === action.payload.id) {
          return {
            ...item,
            count: item.count - 1
          };
        }

        return item;
      });
    },
    editCartProduct: (state, action: PayloadAction<CartProduct>) => {
      state.items = state.items.map((item) => {
        if (item.product.id === action.payload.product.id) {
          return {
            ...item,
            product: action.payload.product
          };
        }

        return item;
      });
    }
  }
});

export const { addToCart, removeFromCart, decreaseCountOfProduct, editCartProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
