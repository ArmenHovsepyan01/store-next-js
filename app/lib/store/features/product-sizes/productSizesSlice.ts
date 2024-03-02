import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISize } from '@/app/lib/definitions';

export const fetchProductSizes = createAsyncThunk('sizes/fetchProductSizes', async () => {
  try {
    const { data } = await axios.get('/api/sizes');
    return data;
  } catch (e) {
    throw new Error('Failed to fetch product sizes.');
  }
});

interface ISizes {
  sizes: ISize[];
  selected?: number | null;
}

interface SizeID {
  id: number;
}

interface PayloadSize {
  item: ISize;
}

const initialState: ISizes = {
  sizes: [],
  selected: null
};

interface SelectedId {
  id: number | null;
}

const productSizesSlice = createSlice({
  name: 'productSizes',
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<SelectedId>) => {
      state.selected = action.payload.id;
    },
    addSize: (state, action: PayloadAction<PayloadSize>) => {
      state.sizes.push(action.payload.item);
    },
    deleteSize: (state, action: PayloadAction<SizeID>) => {
      state.sizes = state.sizes.filter((item) => item.id !== action.payload.id);
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductSizes.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    });
  }
});

export const { deleteSize, addSize, setSize } = productSizesSlice.actions;

export default productSizesSlice.reducer;
