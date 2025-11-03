import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { post, get, patch } from '../net/net';
import {
	GetUserResponse,
	RegisterUserRequest,
	RegisterUserResponse,
	UpdateUserRequest,
	UpdateUserResponse,
} from '../model/net/user.interface';
import { User } from '../model/user';
import { authSlice } from './auth';
import { token } from '../model/token';

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

export const registerUser = createAsyncThunk<RegisterUserResponse, RegisterUserRequest>(
	'auth/register',
	async (registerUserInfo, thunkAPI) => {
		return post<RegisterUserResponse>('auth/register', registerUserInfo)
			.then(response => {
				token.setTokens({
					accessToken: response.accessToken,
					refreshToken: response.refreshToken,
				});
				thunkAPI.dispatch(authSlice.actions.setAuth(true));
				return response;
			})
			.catch(error => {
				return thunkAPI.rejectWithValue({
					message: error.message,
				});
			});
	},
);

export const getUser = createAsyncThunk<GetUserResponse>('user/get', async (_, thunkAPI) => {
	return get<GetUserResponse>('auth/user', {
		signal: thunkAPI.signal,
	})
		.then(response => {
			thunkAPI.dispatch(authSlice.actions.setAuth(true));
			return response;
		})
		.catch(error => {
			return thunkAPI.rejectWithValue({
				message: error.message ?? 'Error',
			});
		});
});

export const updateUser = createAsyncThunk<UpdateUserResponse, UpdateUserRequest>(
	'user/update',
	async (updateUserInfo, thunkAPI) => {
		return patch<GetUserResponse>('auth/user', updateUserInfo).catch(error => {
			token.removeTokens();
			thunkAPI.dispatch(authSlice.actions.setAuth(false));
			return thunkAPI.rejectWithValue({
				message: error.message,
			});
		});
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		set(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.error = null;
		},
		delete(state) {
			state.user = null;
			state.error = null;
		},
	},
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
			})
			.addCase(getUser.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.pending = false;
				state.error = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				if (action.meta.aborted) {
					return;
				}
				state.user = null;
				state.pending = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(getUser.pending, state => {
				state.user = null;
				state.pending = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.pending = false;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.user = null;
				state.pending = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(updateUser.pending, state => {
				state.user = null;
				state.pending = true;
				state.error = null;
			});
	},
});

export default userSlice.reducer;
