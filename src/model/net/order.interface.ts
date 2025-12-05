import { Order } from '../order';
import { SuccessResponse } from './general.interface';

export interface RegisterOrderResponse extends SuccessResponse {
	name?: string;
	order: Order;
}

export interface OrderFeedSocketMessage extends SuccessResponse {
	orders: Order[];
	total: number;
	totalToday: number;
}
