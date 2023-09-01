import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('auth') || null,
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || {},
    error: null,
    isLoading: false,
};

export const login = createAsyncThunk('user/login', async (userData) => {
    const apiURL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.ok) {
        const userDetailsResponse = await fetch(`${apiURL}/api/users/${data.email}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        });
        const userDetails = await userDetailsResponse.json();
        localStorage.setItem('auth', data.token);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.userDetails = {};
            localStorage.removeItem('auth');
            localStorage.removeItem('userDetails');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.userDetails = action.payload.userDetails;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.userDetails = action.payload.userDetails;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
