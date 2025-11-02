import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { post } from '../net/net';
import {
	LogInRequest,
	LogInResponse,
	LogOutRequest,
	LogOutResponse,
} from '../model/net/auth.interface';
import { userSlice } from './user';
import { localStorageUtils } from '../model/local-storage';

type AuthState = {
	isAuthenticated: boolean;
	pending: boolean;
	error: string | null;
};

const initialState: AuthState = {
	isAuthenticated: false,
	pending: false,
	error: null,
};

export const logIn = createAsyncThunk<LogInResponse, LogInRequest>(
	'auth/login',
	async (loginInfo, thunkAPI) => {
		return post<LogInResponse>('auth/login', loginInfo)
			.then(response => {
				localStorageUtils.addAccessToken(response.accessToken);
				localStorageUtils.addRefreshToken(response.refreshToken);
				localStorageUtils.removeResetPassword();
				thunkAPI.dispatch(userSlice.actions.set(response.user));
				return response;
			})
			.catch(error => {
				return thunkAPI.rejectWithValue({
					message: error.message,
				});
			});
	},
);

export const logOut = createAsyncThunk<LogOutResponse>('auth/logout', async (_, thunkAPI) => {
	return post<LogOutResponse>('auth/logout', {
		token: localStorageUtils.getRefreshToken() ?? '',
	} as LogOutRequest)
		.finally(() => {
			localStorageUtils.removeAccessToken();
			localStorageUtils.removeRefreshToken();
			thunkAPI.dispatch(userSlice.actions.delete());
		})
		.catch(error => {
			return thunkAPI.rejectWithValue({
				message: error.message,
			});
		});
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(logIn.fulfilled, state => {
				state.isAuthenticated = true;
				state.pending = false;
				state.error = null;
			})
			.addCase(logIn.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.pending = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(logIn.pending, state => {
				state.isAuthenticated = false;
				state.pending = true;
				state.error = null;
			})
			.addCase(logOut.fulfilled, state => {
				state.isAuthenticated = false;
				state.pending = false;
				state.error = null;
			})
			.addCase(logOut.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.pending = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(logOut.pending, state => {
				state.pending = true;
				state.error = null;
			});
	},
});

export default authSlice.reducer;
