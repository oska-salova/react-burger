import { Order, RegistrationOrder } from '../order';
import { SuccessResponse } from './general.interface';

export interface RegisterOrderResponse extends SuccessResponse {
	name?: string;
	order: RegistrationOrder;
}

export interface OrdersSocketMessage extends SuccessResponse {
	orders?: Order[];
	total?: number;
	totalToday?: number;
	message?: string;
}

export interface GetOrdersResponse extends SuccessResponse {
	orders: Order[];
}
