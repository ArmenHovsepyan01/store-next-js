import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import productReducer from './features/product/product';
import productsReducer from './features/products/productsSlice';
import productsCategoriesReducer from './features/product-sizes/productSizesSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      product: productReducer,
      data: productsReducer,
      productCategories: productsCategoriesReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
