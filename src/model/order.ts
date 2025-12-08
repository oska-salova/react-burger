import { BurgerIngredient } from './burger';
import { User } from './user';

export enum OrderStatus {
	pending = 'pending',
	done = 'done',
	created = 'created',
}

export const orderStatusDict: Record<OrderStatus, string> = {
	[OrderStatus.created]: 'Оформлен',
	[OrderStatus.pending]: 'В работе',
	[OrderStatus.done]: 'Выполнен',
};

export interface Order {
	ingredients: string[];
	_id: string;
	status: OrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
}

export interface RegistrationOrder {
	ingredients: BurgerIngredient[];
	_id: string;
	owner: User & {
		createdAt: string;
		updatedAt: string;
	};
	status: OrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	price: number;
}

export function filterValidOrders(orders: Order[]): Order[] {
	const orderStatuses = Object.values(OrderStatus);
	return orders.filter(
		order =>
			order._id &&
			order.name &&
			order.createdAt &&
			orderStatuses.includes(order.status) &&
			order.ingredients &&
			order.ingredients.every(ingredient => !!ingredient),
	);
}
