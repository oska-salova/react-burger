import doneStatusImage from '../../../images/order/status/done.svg';
import { OrderStatus } from '../../../model/order';

export const statusImages: Record<OrderStatus, string> = {
	[OrderStatus.created]: doneStatusImage,
	[OrderStatus.pending]: doneStatusImage,
	[OrderStatus.done]: doneStatusImage,
};

export const statusDescription: Record<OrderStatus, string> = {
	[OrderStatus.created]: 'Ваш заказ оформлен',
	[OrderStatus.pending]: 'Ваш заказ начали готовить',
	[OrderStatus.done]: 'Ваш заказ готов',
};

export const statusComment: Record<OrderStatus, string> = {
	[OrderStatus.created]: '',
	[OrderStatus.pending]: 'Дождитесь готовности на орбитальной станции',
	[OrderStatus.done]: '',
};
