import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../actions/authActions';

const initialState = {
	token: null,
	userDetails: {},
	error: null,
	isLoading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null;
			state.userDetails = {};
			localStorage.removeItem('auth');
			localStorage.removeItem('userDetails');
			state.error = null;
			state.isLoading = false;
		},
	},
	extraReducers: {
		[login.pending]: (state) => {
			state.isLoading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.token = action.payload.token;
			state.userDetails = action.payload.userDetails;
			state.isLoading = false;
		},
		[login.rejected]: (state, action) => {
			state.error = action.error.message;
			state.isLoading = false;
    },
    [register.pending]: (state) => {
      state.isLoading = true;
  },
  [register.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.token = action.payload.token;
    state.userDetails = action.payload.userDetails;
},

  [register.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
  }
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
