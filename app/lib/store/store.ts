import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import favoritesReducer from '@/app/lib/store/features/favorites/favoritesSlice';
import productReducer from './features/product/product';
import productsReducer from './features/products/productsSlice';
import productsCategoriesReducer from './features/product-categories/productCategoriesSlice';
import productColorsReducer from './features/product-colors/productColorsSlice';
import productSizesReducer from './features/product-sizes/productSizesSlice';
import cartReducer from './features/cart/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      favorites: favoritesReducer,
      product: productReducer,
      data: productsReducer,
      productCategories: productsCategoriesReducer,
      productColors: productColorsReducer,
      productSizes: productSizesReducer,
      cart: cartReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
