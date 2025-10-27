import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order } from '../model/order';
import { RegisterOrderResponse } from '../model/net/order.interface';
import { post } from '../net/net';

type OrderState = {
	order: Order | null;
	registration: boolean;
	error: string | null;
};

const initialState: OrderState = {
	order: null,
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
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(createOrder.fulfilled, (state, { payload }) => {
				state.order = payload.order;
				state.registration = false;
				state.error = null;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.order = null;
				state.registration = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(createOrder.pending, state => {
				state.order = null;
				state.registration = true;
				state.error = null;
			});
	},
});

export default orderSlice.reducer;
