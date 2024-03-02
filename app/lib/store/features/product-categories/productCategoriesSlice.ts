import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category } from '@/app/lib/definitions';

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
  categories: Category[];
  selected?: number | null;
}

interface CategoryID {
  id: number;
}

interface PayloadItem {
  item: Category;
}

interface SelectedId {
  id: number | null;
}

const initialState: CategoriesInitialState = {
  categories: [],
  selected: null
};

const productCategoriesSlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<SelectedId>) => {
      state.selected = action.payload.id;
    },
    addCategory: (state, action: PayloadAction<PayloadItem>) => {
      state.categories.push(action.payload.item);
    },
    deleteCategory: (state, action: PayloadAction<CategoryID>) => {
      state.categories = state.categories.filter((item) => item.id !== action.payload.id);
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    });
  }
});

export const { deleteCategory, addCategory, setCategory } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
