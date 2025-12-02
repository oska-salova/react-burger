import doneStatusImage from '../../../images/order/status/done.svg';
import { OrderStatus } from '../../../model/order';

export const statusImages: Record<OrderStatus, string> = {
	[OrderStatus.in_progress]: doneStatusImage,
	[OrderStatus.done]: doneStatusImage,
};

export const statusDescription: Record<OrderStatus, string> = {
	[OrderStatus.in_progress]: 'Ваш заказ начали готовить',
	[OrderStatus.done]: 'Ваш заказ готов',
};

export const statusComment: Record<OrderStatus, string> = {
	[OrderStatus.in_progress]: 'Дождитесь готовности на орбитальной станции',
	[OrderStatus.done]: '',
};
