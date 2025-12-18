import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, store as appStore } from './store';
import { OrdersSocketMessage } from '../model/net/order.interface';
import { OrderStatus } from '../model/order';
import { orderFeedSlice } from './order-feed';

const testMessage: OrdersSocketMessage = {
	success: true,
	orders: [
		{
			ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093d'],
			_id: 'test_order_id',
			status: OrderStatus.done,
			name: 'test order name',
			number: 10265,
			createdAt: '111',
			updatedAt: '222',
		},
	],
	total: 100,
	totalToday: 10,
};

describe('Order feed reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it("should set status to 'connecting' on connect", () => {
		const newState = rootReducer(rootInitialState, orderFeedSlice.actions.connect(''));
		expect(newState).toEqual({
			...rootInitialState,
			orderFeedReducer: {
				...rootInitialState.orderFeedReducer,
				status: 'connecting',
			},
		});
	});

	it('should return to initial state on disconnect', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderFeedReducer: {
				...rootInitialState.orderFeedReducer,
				status: 'online',
				orders: [],
			},
		};
		const newState = rootReducer(curState, orderFeedSlice.actions.disconnect());
		expect(newState).toEqual(rootInitialState);
	});

	it('should not change state on sendMessage', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderFeedReducer: {
				...rootInitialState.orderFeedReducer,
				status: 'online',
				orders: [],
				totalOrders: 10,
				totalTodayOrders: 5,
			},
		};
		const newState = rootReducer(curState, orderFeedSlice.actions.sendMessage());
		expect(newState).toEqual(curState);
	});

	it("should set status to 'online' on onConnected", () => {
		const newState = rootReducer(
			rootInitialState,
			orderFeedSlice.actions.onConnected(new Event('')),
		);
		expect(newState).toEqual({
			...rootInitialState,
			orderFeedReducer: {
				...rootInitialState.orderFeedReducer,
				status: 'online',
			},
		});
	});

	it("should set status to 'offline' and reset error on onDisconnected", () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderFeedReducer: {
				...rootInitialState.orderFeedReducer,
				status: 'online',
				error: 'test error',
			},
		};
		const newState = rootReducer(
			curState,
			orderFeedSlice.actions.onDisconnected(new CloseEvent('')),
		);
		expect(newState).toEqual({
			...curState,
			orderFeedReducer: {
				...curState.orderFeedReducer,
				status: 'offline',
				error: null,
			},
		});
	});

	it("should set error to 'Connection error' on onError", () => {
		const newState = rootReducer(
			rootInitialState,
			orderFeedSlice.actions.onError(new Event('')),
		);
		expect(newState).toEqual({
			...rootInitialState,
			orderFeedReducer: { ...rootInitialState.orderFeedReducer, error: 'Connection error' },
		});
	});

	it('should set orders and total counts on onMessageReceived', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderFeedReducer: {
				...rootInitialState.orderFeedReducer,
				status: 'online',
			},
		};
		expect(curState.orderFeedReducer.orders).toBeNull();
		expect(curState.orderFeedReducer.totalOrders).toBe(0);
		expect(curState.orderFeedReducer.totalTodayOrders).toBe(0);

		const newState = rootReducer(
			curState,
			orderFeedSlice.actions.onMessageReceived(testMessage),
		);
		expect(newState).toEqual({
			...curState,
			orderFeedReducer: {
				...curState.orderFeedReducer,
				orders: testMessage.orders,
				totalOrders: testMessage.total,
				totalTodayOrders: testMessage.totalToday,
			},
		});
	});
});
