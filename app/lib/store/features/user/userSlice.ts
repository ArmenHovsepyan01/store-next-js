import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

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
}

const initialState: UserLoggedIn = {
  loggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoggedIn>) => {
      state.loggedIn = action.payload.loggedIn;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      return { ...state, ...action.payload, loggedIn: true };
    });
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
