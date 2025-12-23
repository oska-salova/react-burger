import { configureStore } from '@reduxjs/toolkit';
import { OrdersSocketMessage } from '../model/net/order.interface';
import { rootReducer, store as appStore } from './store';
import { OrderStatus } from '../model/order';
import { orderHistorySlice } from './order-history';

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
};

describe('Order history reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it("should set status to 'connecting' on connect", () => {
		const newState = rootReducer(rootInitialState, orderHistorySlice.actions.connect(''));
		expect(newState).toEqual({
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'connecting',
			},
		});
	});

	it('should return to initial state on disconnect', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'online',
				orders: [],
			},
		};
		const newState = rootReducer(curState, orderHistorySlice.actions.disconnect());
		expect(newState).toEqual(rootInitialState);
	});

	it('should not change state on sendMessage', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'online',
				orders: [],
			},
		};
		const newState = rootReducer(curState, orderHistorySlice.actions.sendMessage());
		expect(newState).toEqual(curState);
	});

	it("should set status to 'online' on onConnected", () => {
		const newState = rootReducer(
			rootInitialState,
			orderHistorySlice.actions.onConnected(new Event('')),
		);
		expect(newState).toEqual({
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'online',
			},
		});
	});

	it("should set status to 'offline' and reset error on onDisconnected", () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'online',
				error: 'test error',
			},
		};
		const newState = rootReducer(
			curState,
			orderHistorySlice.actions.onDisconnected(new CloseEvent('')),
		);
		expect(newState).toEqual({
			...curState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'offline',
				error: null,
			},
		});
	});

	it("should set error to 'Connection error' on onError", () => {
		const newState = rootReducer(
			rootInitialState,
			orderHistorySlice.actions.onError(new Event('')),
		);
		expect(newState).toEqual({
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				error: 'Connection error',
			},
		});
	});

	it('should set orders on onMessageReceived', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderHistoryReducer: {
				...rootInitialState.orderHistoryReducer,
				status: 'online',
			},
		};
		expect(curState.orderHistoryReducer.orders).toBeNull();

		const newState = rootReducer(
			curState,
			orderHistorySlice.actions.onMessageReceived(testMessage),
		);
		expect(newState).toEqual({
			...curState,
			orderHistoryReducer: {
				...curState.orderHistoryReducer,
				orders: testMessage.orders,
			},
		});
	});
});
