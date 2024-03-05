import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../definitions';
import Cookies from 'js-cookie';
import axios from 'axios';
import product from '@/app/lib/store/features/product/product';

interface IState {
  data: IProduct[];
}

const initialState: IState = {
  data: []
};

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const token = Cookies.get('token');

  try {
    const response = await axios.get('/api/user-products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Error fetching products data.');
  }
});

export const fetchAllProductsForAdmin = createAsyncThunk(
  'products/fetchAllProductsAdmin',
  async () => {
    const token = Cookies.get('token');

    try {
      const response = await axios.get('/api/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      throw new Error('Error fetching products data.');
    }
  }
);

const productsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IState>) => {
      state.data = action.payload.data;
    },
    deleteProductFromData: (state, action) => {
      state.data = state.data.filter((product) => product.id !== action.payload.id);
    },
    updateProduct: (state, action) => {
      state.data = state.data.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            ...action.payload.values
          };
        }

        return product;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.product
        };
      })
      .addCase(fetchAllProductsForAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.product
        };
      });
  }
});

export const { setProducts, deleteProductFromData, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
