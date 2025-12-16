import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createWebSocketMiddleware } from './middleware/socket-middleware';
import { Order, filterValidOrders } from '../model/order';
import { OrdersSocketMessage } from '../model/net/order.interface';

type OrderFeedState = {
	status: 'offline' | 'connecting' | 'online';
	orders: Order[] | null;
	error: string | null;
	totalOrders: number;
	totalTodayOrders: number;
};

export const initialState: OrderFeedState = {
	status: 'offline',
	orders: null,
	error: null,
	totalOrders: 0,
	totalTodayOrders: 0,
};

export const orderFeedSlice = createSlice({
	name: 'order/feed',
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
				state.totalOrders = payload.total ?? 0;
				state.totalTodayOrders = payload.totalToday ?? 0;
			},
			prepare: (message: OrdersSocketMessage) => {
				if (!message.orders) {
					return { payload: { ...message } };
				}
				return { payload: { ...message, orders: filterValidOrders(message.orders) } };
			},
		},
	},
});

export const orderFeedWebSocketMiddleware = createWebSocketMiddleware<OrdersSocketMessage, void>(
	orderFeedSlice.actions,
	{
		withTokenRefresh: false,
	},
);

export default orderFeedSlice.reducer;
