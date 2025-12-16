import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order, RegistrationOrder } from '../model/order';
import { GetOrdersResponse, RegisterOrderResponse } from '../model/net/order.interface';
import { get, post } from '../net/net';

type OrderState = {
	registrationOrder: RegistrationOrder | null;
	preRegistration: boolean;
	registration: boolean;
	error: string | null;
	orders: Record<number, Order>;
	ordersPending: boolean;
	ordersError: string | null;
};

export const initialState: OrderState = {
	registrationOrder: null,
	preRegistration: false,
	registration: false,
	error: null,
	orders: {},
	ordersPending: false,
	ordersError: null,
};

export const createOrder = createAsyncThunk<RegisterOrderResponse, string[]>(
	'order/create',
	async (ingredientIds: string[], thunkAPI) => {
		const body = {
			ingredients: ingredientIds,
		};
		return post<RegisterOrderResponse>('orders', body).catch(error => {
			return thunkAPI.rejectWithValue({
				message: error.message ?? 'An error occurred while registering the order.',
			});
		});
	},
);

export const getOrderByNumber = createAsyncThunk<Order | null, number>(
	'order/getByNumber',
	async (orderNumber: number, thunkAPI) => {
		return get<GetOrdersResponse>(`orders/${orderNumber}`, {
			signal: thunkAPI.signal,
		})
			.then(response => response.orders.find(order => order.number === orderNumber) ?? null)
			.catch(error => {
				return thunkAPI.rejectWithValue({
					message: error.message ?? 'Order by number getting error.',
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
				state.registrationOrder = payload.order;
				state.registration = false;
				state.error = null;
				state.orders[payload.order.number] = getOrderFromRegistrationOrder(payload.order);
			})
			.addCase(createOrder.rejected, (state, action) => {
				if (!state.registration) {
					return initialState;
				}
				state.registrationOrder = null;
				state.registration = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(createOrder.pending, state => {
				state.preRegistration = false;
				state.registrationOrder = null;
				state.registration = true;
				state.error = null;
			})
			.addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
				state.ordersPending = false;
				if (payload) {
					state.orders[payload.number] = payload;
				}
			})
			.addCase(getOrderByNumber.rejected, (state, action) => {
				if (action.meta.aborted) {
					return;
				}
				state.ordersPending = false;
				state.ordersError =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(getOrderByNumber.pending, state => {
				state.ordersError = null;
				state.ordersPending = true;
			});
	},
});

export default orderSlice.reducer;

const getOrderFromRegistrationOrder = (sourceOrder: RegistrationOrder): Order => {
	return {
		ingredients: sourceOrder.ingredients.map(ingredient => ingredient._id),
		_id: sourceOrder._id,
		status: sourceOrder.status,
		name: sourceOrder.name,
		createdAt: sourceOrder.createdAt,
		updatedAt: sourceOrder.updatedAt,
		number: sourceOrder.number,
	};
};
