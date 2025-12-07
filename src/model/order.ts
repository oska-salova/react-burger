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
