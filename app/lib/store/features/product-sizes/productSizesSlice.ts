import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductSizes = createAsyncThunk('sizes/fetchProductSizes', async () => {
  try {
    const { data } = await axios.get('/api/sizes');
    return data;
  } catch (e) {
    throw new Error('Failed to fetch product sizes.');
  }
});

const initialState = {
  sizes: []
};

const productSizesSlice = createSlice({
  name: 'productSizes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductSizes.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    });
  }
});

export default productSizesSlice.reducer;
