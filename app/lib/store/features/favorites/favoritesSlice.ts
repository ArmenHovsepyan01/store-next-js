import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesItem, IProduct } from '@/app/lib/definitions';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Favorites {
  items: FavoritesItem[];
}

interface FavoritesProduct {
  product: IProduct;
}
interface ProductID {
  id: number;
}

export const fetchFavoritesData = createAsyncThunk('favorites/fetchFavoritesData', async () => {
  try {
    const token = Cookies.get('token');

    const { data } = await axios.get('api/favorites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data.data;
  } catch (e: any) {
    throw new Error(e);
  }
});

const loadInitialFavoritesData = () => {
  if (process.browser) {
    const cartJSON = localStorage.getItem('favorites');
    if (!cartJSON) {
      return [];
    } else {
      return JSON.parse(cartJSON);
    }
  }
};

const initialState: Favorites = {
  items: Cookies.get('token') ? [] : loadInitialFavoritesData()
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoritesProduct>) => {
      const cartItem = state.items.find((item) => item.product.id === action.payload.product.id);
      if (cartItem) {
        state.items = state.items.map((item) => {
          if (item.product.id === action.payload.product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }

          return item;
        });
      } else {
        state.items.push({
          quantity: 1,
          product: action.payload.product
        });
      }
    },
    removeFromFavorites: (state, action: PayloadAction<ProductID>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload.id);
    },
    decreaseCountOfProduct: (state, action: PayloadAction<ProductID>) => {
      state.items = state.items.map((item) => {
        if (item.product.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }

        return item;
      });
    },
    editFavoritesProduct: (state, action: PayloadAction<FavoritesProduct>) => {
      state.items = state.items.map((item) => {
        if (item.product.id === action.payload.product.id) {
          return {
            ...item,
            product: action.payload.product
          };
        }

        return item;
      });
    },
    setAllData: (state, action) => {
      state.items = action.payload.data;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoritesData.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload.data
      };
    });
  }
});

export const {
  addToFavorites,
  removeFromFavorites,
  decreaseCountOfProduct,
  editFavoritesProduct,
  setAllData
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
