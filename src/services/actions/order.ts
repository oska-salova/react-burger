import { Order } from '../../model/order';

export enum OrderActionTypes {
	SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS',
	SET_ORDER_REQUEST = 'SET_ORDER_REQUEST',
	SET_ORDER_ERROR = 'SET_ORDER_ERROR',
}

type SetOrderSuccessAction = {
	type: OrderActionTypes.SET_ORDER_SUCCESS;
	order: Order;
};

type SetOrderRequestAction = {
	type: OrderActionTypes.SET_ORDER_REQUEST;
};

type SetOrderErrorAction = {
	type: OrderActionTypes.SET_ORDER_ERROR;
	error: string | null;
};

export type SetOrderActions = SetOrderSuccessAction | SetOrderRequestAction | SetOrderErrorAction;
