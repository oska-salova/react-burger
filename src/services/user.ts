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
import { localStorageUtils } from '../model/local-storage';

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
				localStorageUtils.addAccessToken(response.accessToken);
				localStorageUtils.addRefreshToken(response.refreshToken);
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
	return get<GetUserResponse>('auth/user').catch(error => {
		return thunkAPI.rejectWithValue({
			message: error.message,
		});
	});
});

export const updateUser = createAsyncThunk<UpdateUserResponse, UpdateUserRequest>(
	'user/update',
	async (updateUserInfo, thunkAPI) => {
		return patch<GetUserResponse>('auth/user', updateUserInfo).catch(error => {
			localStorageUtils.removeAccessToken();
			localStorageUtils.removeRefreshToken();
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
		},
		delete(state) {
			state.user = null;
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
