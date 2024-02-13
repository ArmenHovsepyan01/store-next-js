import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sizes: ['l', 'xl', 'xxl']
};

const productSizesSlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {}
});

export default productSizesSlice.reducer;
