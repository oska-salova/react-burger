import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order } from '../model/order';
import { RegisterOrderErrorResponse, RegisterOrderResponse } from '../model/net/order.interface';

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

const ORDERS_URL = 'https://norma.nomoreparties.space/api/orders';
const GENERAL_ERROR_MESSAGE = 'An error occurred while registering the order.';

export const createOrder = createAsyncThunk<RegisterOrderResponse, string[]>(
	'order/create',
	async (ingredientIds: string[], thunkAPI) => {
		try {
			const response = await fetch(ORDERS_URL, {
				method: 'POST',
				body: JSON.stringify({
					ingredients: ingredientIds,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorResponse = (await response.json()) as RegisterOrderErrorResponse;
				return thunkAPI.rejectWithValue({
					message: errorResponse.message || GENERAL_ERROR_MESSAGE,
				});
			}

			return (await response.json()) as RegisterOrderResponse;
		} catch (error: unknown) {
			const resultError =
				!(error instanceof Error) || error instanceof SyntaxError
					? { message: GENERAL_ERROR_MESSAGE }
					: { message: error.message };
			return thunkAPI.rejectWithValue(resultError);
		}
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
