import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, store as appStore } from './store';
import { OrderStatus, RegistrationOrder } from '../model/order';
import { createOrder, getOrderByNumber, orderSlice } from './order';

const testRegistrationOrder: RegistrationOrder = {
	_id: 'test-order-id',
	ingredients: [
		{
			_id: '643d69a5c3f7b9001cfa093c',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		},
	],
	owner: {
		email: 'test@test.com',
		name: 'user',
		createdAt: '111',
		updatedAt: '222',
	},
	status: OrderStatus.done,
	name: 'test order name',
	createdAt: '111',
	updatedAt: '222',
	number: 24415,
	price: 150,
};

describe('Order reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it('should set preRegistration to true on initRegistration', () => {
		const prevState = rootInitialState;
		const newState = rootReducer(prevState, orderSlice.actions.initRegistration());

		expect(newState).toEqual({
			...prevState,
			orderReducer: {
				...prevState.orderReducer,
				preRegistration: true,
			},
		});
	});

	it('should reset to rootInitialState on reset action', () => {
		const prevState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				registrationOrder: testRegistrationOrder,
				orders: {
					233453: {
						ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093d'],
						_id: 'test_order_id',
						status: OrderStatus.done,
						name: 'test order name',
						number: 10265,
						createdAt: '111',
						updatedAt: '222',
					},
				},
			},
		};
		const newState = rootReducer(prevState, orderSlice.actions.reset());
		expect(newState).toEqual(rootInitialState);
	});

	it('should set registrationOrder, add to orders, reset error/pending states when createOrder succeeded', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				registration: true,
			},
		};
		expect(curState.orderReducer.orders).toEqual({});

		const action = {
			type: createOrder.fulfilled.type,
			payload: { name: 'order name', order: testRegistrationOrder },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				registration: false,
				error: null,
				registrationOrder: action.payload.order,
				orders: {
					...curState.orderReducer.orders,
					[action.payload.order.number]: {
						ingredients: testRegistrationOrder.ingredients.map(
							ingredient => ingredient._id,
						),
						_id: testRegistrationOrder._id,
						status: testRegistrationOrder.status,
						name: testRegistrationOrder.name,
						createdAt: testRegistrationOrder.createdAt,
						updatedAt: testRegistrationOrder.updatedAt,
						number: testRegistrationOrder.number,
					},
				},
			},
		});
	});

	it('should set error message and reset pending state when createOrder failed', () => {
		const curState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				registration: true,
				registrationOrder: testRegistrationOrder,
				error: null,
			},
		};
		const errorMessage = 'createOrder error';
		const action = {
			type: createOrder.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				registrationOrder: null,
				registration: false,
				error: errorMessage,
			},
		});
	});

	it('should reset to initial state when createOrder failed and order registration is already not in progress', () => {
		const curState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				registration: false,
				registrationOrder: testRegistrationOrder,
				error: null,
			},
		};
		expect(curState).not.toEqual(rootInitialState);
		const errorMessage = 'createOrder error';
		const action = {
			type: createOrder.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual(rootInitialState);
	});

	it('should set registration to true and reset order/error when createOrder is in progress', () => {
		const curState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				registration: false,
				registrationOrder: testRegistrationOrder,
				preRegistration: true,
			},
		};
		const action = {
			type: createOrder.pending.type,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				registrationOrder: null,
				registration: true,
				error: null,
				preRegistration: false,
			},
		});
	});

	it('should add order when getOrderByNumber succeeded and order found', () => {
		const foundOrder = {
			ingredients: testRegistrationOrder.ingredients.map(ingredient => ingredient._id),
			_id: testRegistrationOrder._id,
			status: testRegistrationOrder.status,
			name: testRegistrationOrder.name,
			createdAt: testRegistrationOrder.createdAt,
			updatedAt: testRegistrationOrder.updatedAt,
			number: testRegistrationOrder.number,
		};
		const curState: typeof rootInitialState = {
			...rootInitialState,
		};
		expect(curState.orderReducer.orders).toEqual({});

		const action = {
			type: getOrderByNumber.fulfilled.type,
			payload: foundOrder,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				orders: {
					...curState.orderReducer.orders,
					[action.payload.number]: foundOrder,
				},
			},
		});
	});

	it('should not add order when getOrderByNumber succeeded and order was not found', () => {
		const foundOrder = null;
		const curState: typeof rootInitialState = {
			...rootInitialState,
		};
		expect(curState.orderReducer.orders).toEqual({});

		const action = {
			type: getOrderByNumber.fulfilled.type,
			payload: foundOrder,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				orders: {},
			},
		});
	});

	it('should set ordersError and reset ordersPending state when getOrderByNumber failed', () => {
		const curState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				ordersPending: true,
				error: null,
			},
		};
		const errorMessage = 'getOrderByNumber error';
		const action = {
			type: getOrderByNumber.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				ordersPending: false,
				ordersError: errorMessage,
			},
		});
	});

	it('should reset ordersError/ordersPending when getOrderByNumber is in progress', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			orderReducer: {
				...rootInitialState.orderReducer,
				ordersError: 'error',
				ordersPending: false,
			},
		};
		const action = {
			type: getOrderByNumber.pending.type,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			orderReducer: {
				...curState.orderReducer,
				ordersPending: true,
				ordersError: null,
			},
		});
	});
});
