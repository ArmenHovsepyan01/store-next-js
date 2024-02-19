import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesItem, IProduct } from '@/app/lib/definitions';

interface Favorites {
  items: FavoritesItem[];
}

interface FavoritesProduct {
  product: IProduct;
}
interface ProductID {
  id: number;
}

const loadInitialFavoritesData = () => {
  if (process.browser) {
    const cartJSON = localStorage.getItem('favorites');
    return cartJSON ? JSON.parse(cartJSON) : [];
  }
  return [];
};

const initialState: Favorites = {
  items: loadInitialFavoritesData()
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
    removeFromFavorites: (state, action: PayloadAction<ProductID>) => {
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
    }
  }
});

export const { addToFavorites, removeFromFavorites, decreaseCountOfProduct, editFavoritesProduct } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
