import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  UID: string;
  phoneNumber: string;
  position: string;
  userLastName: string;
  userName: string;
}

interface UsersState {
  data: User[];
}

const initialState: UsersState = {
  data: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export const selectUsers = (state: { users: UsersState }) => state.users.data;

export default userSlice.reducer;
