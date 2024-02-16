import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductColors = createAsyncThunk('colors/fetchProductColors', async () => {
  try {
    const { data } = await axios.get('/api/colors');
    return data;
  } catch (e) {
    throw new Error('Failed to fetch product colors.');
  }
});

const initialState = {
  colors: []
};

const productColorsSlice = createSlice({
  name: 'productColors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductColors.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    });
  }
});

export default productColorsSlice.reducer;
