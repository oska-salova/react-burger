import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { post } from '../net/net';
import { RegisterUserRequest, RegisterUserResponse } from '../model/net/user.interface';
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

export const registerUser = createAsyncThunk<RegisterUserResponse, RegisterUserRequest>(
	'auth/register',
	async (registerUserInfo, thunkAPI) => {
		return post<RegisterUserResponse>('auth/register', registerUserInfo).catch(error => {
			return thunkAPI.rejectWithValue({
				message: error.message ?? GENERAL_ERROR_MESSAGE,
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
			});
	},
});

export default userSlice.reducer;
