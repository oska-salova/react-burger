import { OrdersSocketMessage } from '../model/net/order.interface';
import { OrderStatus } from '../model/order';
import reducer, { initialState, orderHistorySlice } from './order-history';

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
	it('should return correct initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({
			status: 'offline',
			orders: null,
			error: null,
		});
	});

	it("should set status to 'connecting' on connect", () => {
		const newState = reducer(initialState, orderHistorySlice.actions.connect(''));
		expect(newState).toEqual({
			...initialState,
			status: 'connecting',
		});
	});

	it('should return to initial state on disconnect', () => {
		const curState: typeof initialState = {
			status: 'online',
			orders: [],
			error: null,
		};
		const newState = reducer(curState, orderHistorySlice.actions.disconnect());
		expect(newState).toEqual(initialState);
	});

	it('should not change state on sendMessage', () => {
		const curState: typeof initialState = {
			status: 'online',
			orders: [],
			error: null,
		};
		const newState = reducer(curState, orderHistorySlice.actions.sendMessage());
		expect(newState).toEqual(curState);
	});

	it("should set status to 'online' on onConnected", () => {
		const newState = reducer(
			initialState,
			orderHistorySlice.actions.onConnected(new Event('')),
		);
		expect(newState).toEqual({ ...initialState, status: 'online' });
	});

	it("should set status to 'offline' and reset error on onDisconnected", () => {
		const curState: typeof initialState = {
			...initialState,
			status: 'online',
			error: 'test error',
		};
		const newState = reducer(
			curState,
			orderHistorySlice.actions.onDisconnected(new CloseEvent('')),
		);
		expect(newState).toEqual({ ...curState, status: 'offline', error: null });
	});

	it("should set error to 'Connection error' on onError", () => {
		const newState = reducer(initialState, orderHistorySlice.actions.onError(new Event('')));
		expect(newState).toEqual({ ...initialState, error: 'Connection error' });
	});

	it('should set orders on onMessageReceived', () => {
		const curState: typeof initialState = {
			...initialState,
			status: 'online',
		};
		expect(curState.orders).toBeNull();

		const newState = reducer(
			curState,
			orderHistorySlice.actions.onMessageReceived(testMessage),
		);
		expect(newState.orders).toEqual(testMessage.orders);
	});
});
