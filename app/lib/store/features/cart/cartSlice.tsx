import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, IProduct } from '@/app/lib/definitions';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Cart {
  items: CartItem[];
}

interface CartProduct {
  cartItem: CartItem;
}
interface CartId {
  id: number;
}

const initialState: Cart = {
  items: []
};

export const fetchCartItems = createAsyncThunk('categories/fetchCartItems', async () => {
  try {
    const response = await axios.get(`api/cart`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });
    return response.data;
  } catch (e: any) {
    throw new Error('Failed to fetch categories.');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const cartItem = state.items.find((item) => item.id === action.payload.cartItem.id);
      if (cartItem) {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.cartItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }

          return item;
        });
      } else {
        state.items.push(action.payload.cartItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartId>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    decreaseCountOfProduct: (state, action: PayloadAction<CartId>) => {
      state.items = state.items.map((item) => {
        if (item.Product.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }

        return item;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      return {
        items: [...action.payload]
      };
    });
  }
});

export const { addToCart, removeFromCart, decreaseCountOfProduct } = cartSlice.actions;
export default cartSlice.reducer;
