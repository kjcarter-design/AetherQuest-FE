import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';


const storedToken = localStorage.getItem('auth');
const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

const preloadedState = {
    user: {
        token: storedToken || null, 
        userDetails: storedUserDetails || {}, 
        error: null,
        isLoading: false
    }
};

const store = configureStore({
    reducer: {
        user: userSlice
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
