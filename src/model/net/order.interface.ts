import { Order } from '../order';

export interface RegisterOrderResponse {
	success: true;
	name?: string;
	order: Order;
}

export interface RegisterOrderErrorResponse {
	success: false;
	message: string;
}
