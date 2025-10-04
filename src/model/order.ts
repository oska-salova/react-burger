export enum OrderStatus {
	done = 'done',
}

export interface Order {
	id: string;
	status: OrderStatus;
}
