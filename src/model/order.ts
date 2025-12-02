import { BurgerIngredient } from './burger';
import { User } from './user';

export enum OrderStatus {
	in_progress = 'in_progress',
	done = 'done',
}

export interface Order {
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
