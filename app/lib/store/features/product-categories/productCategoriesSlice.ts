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
      function updateCategories(categories: Category[], id: number, item: any): Category[] {
        return categories.map((category) => {
          if (category.id === id) {
            return { ...category, subcategories: [...category.subcategories, item] };
          } else if (category.subcategories) {
            const updatedSubcategories = updateCategories(category.subcategories, id, item);
            return { ...category, subcategories: updatedSubcategories };
          } else {
            return category;
          }
        });
      }

      function updateSubcategories(
        categories: Category[],
        parentId: number,
        item: any
      ): Category | null {
        for (const category of categories) {
          if (category.id === parentId) {
            return { ...category, subcategories: [...category?.subcategories, item] };
          } else if (category?.subcategories) {
            const updatedCategory = updateSubcategories(category?.subcategories, parentId, item);
            if (updatedCategory) {
              return updatedCategory;
            }
          }
        }

        return null;
      }

      const updatedCategory = updateSubcategories(
        JSON.parse(JSON.stringify(state.categories)),
        +action.payload.item.parent_id,
        action.payload.item
      );

      if (!updatedCategory) {
        state.categories.push(action.payload.item);
      } else {
        state.categories = updateCategories(
          JSON.parse(JSON.stringify(state.categories)),
          +action.payload.item.parent_id,
          action.payload.item
        );
      }
    },
    deleteCategory: (state, action: PayloadAction<CategoryID>) => {
      function deleteFromCategories(arr: Category[], id: number): Category[] {
        return arr
          .filter((el) => el.id !== id)
          .map((el) => {
            if (!el.subcategories || !Array.isArray(el.subcategories)) return el;
            el.subcategories = deleteFromCategories(el.subcategories, id);
            return el;
          });
      }

      state.categories = deleteFromCategories(
        JSON.parse(JSON.stringify(state.categories)),
        action.payload.id
      );
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
