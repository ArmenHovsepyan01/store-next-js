import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const token = Cookies.get('token');

  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data.');
  }
});
interface UserLoggedIn {
  loggedIn: boolean;
  avatar: string;
}

const initialState: UserLoggedIn = {
  loggedIn: false,
  avatar: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoggedIn>) => {
      state.loggedIn = action.payload.loggedIn;
      state.avatar = action.payload.avatar;
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
