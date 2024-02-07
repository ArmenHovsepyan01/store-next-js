import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../definitions';

interface IState {
  data: Product[];
}

const initialState: IState = {
  data: []
};

const productsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IState>) => {
      state.data = action.payload.data;
    }
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
