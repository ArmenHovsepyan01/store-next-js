import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IColor } from '../../../definitions';

export const fetchProductColors = createAsyncThunk('colors/fetchProductColors', async () => {
  try {
    const { data } = await axios.get('/api/colors');
    return data;
  } catch (e) {
    throw new Error('Failed to fetch product colors.');
  }
});

interface IColors {
  colors: IColor[];
  selected?: number | null;
}

interface ColorID {
  id: number;
}

interface PayloadColor {
  item: IColor;
}

const initialState: IColors = {
  colors: [],
  selected: null
};

interface SelectedId {
  id: number | null;
}

const productColorsSlice = createSlice({
  name: 'productColors',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<SelectedId>) => {
      state.selected = action.payload.id;
    },
    addColor: (state, action: PayloadAction<PayloadColor>) => {
      console.log(action.payload.item);
      state.colors.push(action.payload.item);
    },
    deleteColor: (state, action: PayloadAction<ColorID>) => {
      state.colors = state.colors.filter((item) => item.id !== action.payload.id);
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductColors.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    });
  }
});

export const { deleteColor, addColor, setColor } = productColorsSlice.actions;
export default productColorsSlice.reducer;
