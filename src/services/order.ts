import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order } from '../model/order';
import { RegisterOrderResponse } from '../model/net/order.interface';
import { post } from '../net/net';

type OrderState = {
	order: Order | null;
	preRegistration: boolean;
	registration: boolean;
	error: string | null;
};

const initialState: OrderState = {
	order: null,
	preRegistration: false,
	registration: false,
	error: null,
};

const GENERAL_ERROR_MESSAGE = 'An error occurred while registering the order.';

export const createOrder = createAsyncThunk<RegisterOrderResponse, string[]>(
	'order/create',
	async (ingredientIds: string[], thunkAPI) => {
		const body = {
			ingredients: ingredientIds,
		};
		return post<RegisterOrderResponse>('orders', body).catch(error => {
			return thunkAPI.rejectWithValue({
				message: error.message ?? GENERAL_ERROR_MESSAGE,
			});
		});
	},
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		initRegistration(state) {
			state.preRegistration = true;
		},
		reset() {
			return initialState;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createOrder.fulfilled, (state, { payload }) => {
				if (!state.registration) {
					return initialState;
				}
				state.order = payload.order;
				state.registration = false;
				state.error = null;
			})
			.addCase(createOrder.rejected, (state, action) => {
				if (!state.registration) {
					return initialState;
				}
				state.order = null;
				state.registration = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(createOrder.pending, state => {
				state.preRegistration = false;
				state.order = null;
				state.registration = true;
				state.error = null;
			});
	},
});

export default orderSlice.reducer;
