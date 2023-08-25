import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('user/login', async (userData) => {
    const apiURL = process.env.REACT_APP_API_URL
    const response = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.ok) {
        const userDetailsResponse = await fetch(`http://localhost:5000/api/users/${data.email}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        });
        const userDetails = await userDetailsResponse.json();
        localStorage.setItem('auth',
                JSON.stringify({
                    token: data.token,
                    email: data.email
                })
        );
        localStorage.setItem('userDetails', JSON.stringify(userDetails))
        console.log(userDetails)
        return { token: data.token, userDetails };
    } else {
        throw new Error(data.message);
    }
});

export const register = createAsyncThunk('user/register', async (userData) => {
    const apiURL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiURL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
});
