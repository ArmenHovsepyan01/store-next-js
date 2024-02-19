import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductCategories = createAsyncThunk(
  'categories/fetchProductCategories',
  async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      return response.data;
    } catch (e: any) {
      throw new Error('Failed to fetch categories.');
    }
  }
);

interface CategoriesInitialState {
  categories: any[];
}

const initialState: CategoriesInitialState = {
  categories: []
};

const productCategoriesSlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    });
  }
});

export default productCategoriesSlice.reducer;
