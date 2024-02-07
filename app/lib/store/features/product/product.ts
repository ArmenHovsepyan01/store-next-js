import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/lib/definitions';

interface IState {
  product: Product;
}

const initialState: IState = {
  product: {} as Product
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IState>) => {
      state.product = action.payload.product;
    }
  }
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
