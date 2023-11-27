import { configureStore } from '@reduxjs/toolkit';
import phoneReducer from './phoneSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    phone: phoneReducer,
    users: userReducer
  },
});

export default store;
