import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, Product } from '@/app/lib/definitions';

interface IState {
  product: IProduct;
}

const initialState: IState = {
  product: {} as IProduct
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
