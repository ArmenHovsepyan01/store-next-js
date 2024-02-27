import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/app/lib/definitions';

interface IState {
  product: IProduct;
}

interface IPublish {
  isPublished: boolean;
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
    },
    publishCurrentProduct: (state, action: PayloadAction<IPublish>) => {
      state.product = {
        ...state.product,
        isPublished: action.payload.isPublished
      };
    }
  }
});

export const { setProduct, publishCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
