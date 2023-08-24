import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('user/login', async (userData) => {
    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.ok) {
        return { userData: data };
    } else {
        throw new Error(data.message);
    }
});
