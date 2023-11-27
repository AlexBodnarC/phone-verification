import { createSlice } from '@reduxjs/toolkit';

interface PhoneState {
  number: string | null;
  uid: string | null;
  token: string | null;
  auth: boolean;
}

const phoneSlice = createSlice({
  name: 'phone',
  initialState: { number: null, uid: null, token: null, auth: false } as PhoneState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.number = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setPhoneNumber, setUid, setToken, setAuth } = phoneSlice.actions;
export const selectPhoneNumber = (state: { phone: PhoneState }) => state.phone.number;
export const selectUid = (state: { phone: PhoneState }) => state.phone.uid;
export const selectToken = (state: { phone: PhoneState }) => state.phone.token;
export const selectAuth = (state: { phone: PhoneState }) => state.phone.auth;

export default phoneSlice.reducer;
