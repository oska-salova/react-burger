export enum OrderStatus {
	pending = 'pending',
	done = 'done',
	created = 'created',
}

export interface Order {
	ingredients: string[];
	_id: string;
	status: OrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
}
