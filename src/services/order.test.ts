import { OrderStatus, RegistrationOrder } from '../model/order';
import orderReducer, { createOrder, getOrderByNumber, initialState, orderSlice } from './order';

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
	it('should return correct initial state', () => {
		expect(orderReducer(undefined, { type: 'unknown' })).toEqual({
			registrationOrder: null,
			preRegistration: false,
			registration: false,
			error: null,
			orders: {},
			ordersPending: false,
			ordersError: null,
		});
	});

	it('should set preRegistration to true on initRegistration', () => {
		const prevState = initialState;
		const newState = orderReducer(prevState, orderSlice.actions.initRegistration());

		expect(newState).toEqual({
			...prevState,
			preRegistration: true,
		});
	});

	it('should reset to initialState on reset action', () => {
		const prevState = {
			registrationOrder: testRegistrationOrder,
			preRegistration: false,
			registration: false,
			error: null,
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
			ordersPending: false,
			ordersError: null,
		};
		const newState = orderReducer(prevState, orderSlice.actions.reset());

		expect(newState).toEqual(initialState);
	});

	it('should set registrationOrder, add to orders, reset error/pending states when createOrder succeeded', () => {
		const curState: typeof initialState = {
			...initialState,
			registration: true,
		};
		expect(curState.orders).toEqual({});

		const action = {
			type: createOrder.fulfilled.type,
			payload: { name: 'order name', order: testRegistrationOrder },
		};
		const newState = orderReducer(curState, action);
		expect(newState.registration).toBe(false);
		expect(newState.error).toBeNull();
		expect(newState.orders[action.payload.order.number]).toEqual({
			ingredients: testRegistrationOrder.ingredients.map(ingredient => ingredient._id),
			_id: testRegistrationOrder._id,
			status: testRegistrationOrder.status,
			name: testRegistrationOrder.name,
			createdAt: testRegistrationOrder.createdAt,
			updatedAt: testRegistrationOrder.updatedAt,
			number: testRegistrationOrder.number,
		});
	});

	it('should set error message and reset pending state when createOrder failed', () => {
		const curState = {
			...initialState,
			registration: true,
			registrationOrder: testRegistrationOrder,
			error: null,
		};
		const errorMessage = 'createOrder error';
		const action = {
			type: createOrder.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = orderReducer(curState, action);
		expect(newState.registrationOrder).toBeNull();
		expect(newState.registration).toBe(false);
		expect(newState.error).toBe(errorMessage);
	});

	it('should reset to initial state when createOrder failed and order registration is already not in progress', () => {
		const curState = {
			...initialState,
			registration: false,
			registrationOrder: testRegistrationOrder,
			error: null,
		};
		expect(curState).not.toEqual(initialState);
		const errorMessage = 'createOrder error';
		const action = {
			type: createOrder.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = orderReducer(curState, action);
		expect(newState).toEqual(initialState);
	});

	it('should set registration to true and reset order/error when createOrder is in progress', () => {
		const curState = {
			...initialState,
			registration: false,
			registrationOrder: testRegistrationOrder,
			preRegistration: true,
		};
		const action = {
			type: createOrder.pending.type,
		};
		const newState = orderReducer(curState, action);
		expect(newState.registration).toBe(true);
		expect(newState.preRegistration).toBe(false);
		expect(newState.error).toBe(null);
		expect(newState.registrationOrder).toBe(null);
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
		const curState: typeof initialState = {
			...initialState,
		};
		expect(curState.orders).toEqual({});

		const action = {
			type: getOrderByNumber.fulfilled.type,
			payload: foundOrder,
		};
		const newState = orderReducer(curState, action);
		expect(newState.orders[action.payload.number]).toEqual(foundOrder);
	});

	it('should not add order when getOrderByNumber succeeded and order was not found', () => {
		const foundOrder = null;
		const curState: typeof initialState = {
			...initialState,
		};
		expect(curState.orders).toEqual({});

		const action = {
			type: getOrderByNumber.fulfilled.type,
			payload: foundOrder,
		};
		const newState = orderReducer(curState, action);
		expect(newState.orders).toEqual({});
	});

	it('should set ordersError and reset ordersPending state when getOrderByNumber failed', () => {
		const curState = {
			...initialState,
			ordersPending: true,
			error: null,
		};
		const errorMessage = 'getOrderByNumber error';
		const action = {
			type: getOrderByNumber.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = orderReducer(curState, action);
		expect(newState.ordersPending).toBe(false);
		expect(newState.ordersError).toBe(errorMessage);
	});

	it('should reset ordersError/ordersPending when getOrderByNumber is in progress', () => {
		const curState: typeof initialState = {
			...initialState,
			ordersError: 'error',
			ordersPending: false,
		};
		const action = {
			type: getOrderByNumber.pending.type,
		};
		const newState = orderReducer(curState, action);
		expect(newState.ordersPending).toBe(true);
		expect(newState.ordersError).toBe(null);
	});
});
