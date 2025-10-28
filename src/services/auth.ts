import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../net/net';
import { RegisterUserResponse } from '../model/net/auth.interface';
import { User } from '../model/user';

type UserState = {
	user: User | null;
	pending: boolean;
	error: string | null;
};

const initialState: UserState = {
	user: null,
	pending: false,
	error: null,
};

const GENERAL_ERROR_MESSAGE = 'An error occurred while registering the user.';

export const registerUser = createAsyncThunk<
	RegisterUserResponse,
	{ name: string; email: string; password: string }
>('auth/register', async (registerUserInfo, thunkAPI) => {
	return post<RegisterUserResponse>('auth/register', registerUserInfo).catch(error => {
		return thunkAPI.rejectWithValue({
			message: error.message ?? GENERAL_ERROR_MESSAGE,
		});
	});
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.pending = false;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.user = null;
				state.pending = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(registerUser.pending, state => {
				state.user = null;
				state.pending = true;
				state.error = null;
			});
	},
});

export default authSlice.reducer;
