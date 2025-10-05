import doneStatusImage from '../../../images/order/status/done.svg';
import { OrderStatus } from '../../../model/order';

export const statusImages: { [status in keyof typeof OrderStatus]: string } = {
	[OrderStatus.done]: doneStatusImage,
};

export const statusDescription: { [status in keyof typeof OrderStatus]: string } = {
	[OrderStatus.done]: 'Ваш заказ начали готовить',
};

export const statusComment: { [status in keyof typeof OrderStatus]: string } = {
	[OrderStatus.done]: 'Дождитесь готовности на орбитальной станции',
};
