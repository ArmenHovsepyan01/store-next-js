import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IAddress } from '@/app/lib/definitions';
import { getSupportedArchTriples } from 'next/dist/build/swc';

interface AddressesPayload {
  addresses: IAddress[];
}

interface IAddressPayload {
  address: IAddress;
}

export const fetchUserAddresses = createAsyncThunk(
  'addresses/fetchUserAddresses',
  async (): Promise<AddressesPayload> => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }
);

const initialState: AddressesPayload = {
  addresses: []
};

const addressesSlice = createSlice({
  name: 'user_addresses',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      return {
        ...action.payload.addresses
      };
    },
    addAddress: (state, action: PayloadAction<{ address: IAddress }>) => {
      state.addresses.push(action.payload.address);
    },
    removeAddress: (state, action: PayloadAction<{ id: number }>) => {
      state.addresses.filter((item) => item.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddresses.fulfilled, (state, action) => {
      console.log(action.payload.addresses);
      return {
        ...state,
        ...action.payload.addresses
      };
    });
  }
});

export const { addAddress, removeAddress, setAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
