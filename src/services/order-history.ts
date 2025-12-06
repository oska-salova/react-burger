import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createWebSocketMiddleware } from './middleware/socket-middleware';
import { Order } from '../model/order';
import { OrdersSocketMessage } from '../model/net/order.interface';

type OrderHistoryState = {
	status: 'offline' | 'connecting' | 'online';
	orders: Order[] | null;
	error: string | null;
};

const initialState: OrderHistoryState = {
	status: 'offline',
	orders: null,
	error: null,
};

export const orderHistorySlice = createSlice({
	name: 'order/history',
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		connect(state, _action: PayloadAction<string>) {
			state.status = 'connecting';
		},
		disconnect() {
			return initialState;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		sendMessage(state, _action: PayloadAction<void>) {
			return state;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onConnected(state, _action: PayloadAction<Event>) {
			state.status = 'online';
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onDisconnected(state, _action: PayloadAction<CloseEvent>) {
			state.status = 'offline';
			state.error = null;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onError(state, _action: PayloadAction<Event>) {
			state.error = 'Connection error';
		},
		onMessageReceived: {
			reducer: (state, { payload }: PayloadAction<OrdersSocketMessage>) => {
				state.orders = payload.orders ?? null;
			},
			prepare: (message: OrdersSocketMessage) => {
				const orders = message.orders?.sort((a, b) => {
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				});
				return { payload: { ...message, orders: orders } };
			},
		},
	},
});

export const orderHistoryWebSocketMiddleware = createWebSocketMiddleware<OrdersSocketMessage, void>(
	orderHistorySlice.actions,
	{
		withTokenRefresh: true,
	},
);

export default orderHistorySlice.reducer;
