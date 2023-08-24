import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userData: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
    // ... (other reducers if any)
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload.userData;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
