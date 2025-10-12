import { Order } from '../../model/order';
import { OrderActionTypes, type SetOrderActions } from '../actions/order';

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

export function orderReducer(state = initialState, action: SetOrderActions): OrderState {
	switch (action.type) {
		case OrderActionTypes.SET_ORDER_SUCCESS:
			return {
				...state,
				order: action.order,
				registration: false,
				error: null,
			};

		case OrderActionTypes.SET_ORDER_REQUEST:
			return {
				...state,
				order: null,
				registration: true,
				error: null,
			};

		case OrderActionTypes.SET_ORDER_ERROR:
			return {
				...state,
				order: null,
				registration: false,
				error: action.error,
			};

		default:
			return state;
	}
}
