import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';


const store = configureStore({
  reducer: {
    user: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
