import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { IAddress } from '@/app/lib/definitions';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const token = Cookies.get('token');

  try {
    const response = await axios.get('/api/users/auth', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const encryptedRole = CryptoJS.AES.encrypt(
      JSON.stringify(response.data.role),
      process.env.SECRET_KEY || 'my-password'
    ).toString();

    Cookies.set('user_role', encryptedRole);

    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data.');
  }
});

interface UserLoggedIn {
  loggedIn: boolean;
  id?: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  addresses: IAddress[];
}

const initialState: UserLoggedIn = {
  loggedIn: false,
  addresses: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoggedIn>) => {
      state.loggedIn = action.payload.loggedIn;
    },
    setAddresses: (state, action) => {
      return {
        ...state,
        addresses: [...action.payload.addresses]
      };
    },
    addAddress: (state, action: PayloadAction<{ address: IAddress }>) => {
      state.addresses.push(action.payload.address);
    },
    setDefaultAddress: (state, action: PayloadAction<{ id: number }>) => {
      state.addresses = state.addresses.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isDefault: true
          };
        }

        return {
          ...item,
          isDefault: false
        };
      });
    },
    updateAddress: (state, action: PayloadAction<{ addresses: IAddress }>) => {
      state.addresses = state.addresses.map((item) => {
        if (item.id === action.payload.addresses.id) {
          return {
            ...item,
            ...action.payload.addresses
          };
        }

        return item;
      });
    },
    removeAddress: (state, action: PayloadAction<{ id: number }>) => {
      return {
        ...state,
        addresses: state.addresses.filter((item) => item.id !== action.payload.id)
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      return { ...state, ...action.payload, loggedIn: true };
    });
  }
});

export const {
  setUser,
  setAddresses,
  removeAddress,
  addAddress,
  updateAddress,
  setDefaultAddress
} = userSlice.actions;
export default userSlice.reducer;
