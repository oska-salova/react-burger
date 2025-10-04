import { FC } from 'react';
import styles from './order-details.module.css';
import { Order, OrderStatus } from '../../../model/order';
import { statusComment, statusDescription, statusImages } from './order-details-dictionary';

interface OrderDetailsProps {
	order: Order;
}

const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
	const getOrderStatus = (status: OrderStatus) => (
		<>
			<img src={statusImages[order.status]} alt={status} className="ml-4 mr-4" />
			<p className="text text_type_main-default">{statusDescription[status]}</p>
			<p className="text text_type_main-default text_color_inactive">
				{statusComment[status]}
			</p>
		</>
	);

	return (
		<>
			<section className={styles.details}>
				<p className={`${styles.orderId} text text_type_digits-large`}>{order.id}</p>
				<p className="text text_type_main-small">идентификатор заказа</p>
				{getOrderStatus(order.status)}
			</section>
		</>
	);
};

export default OrderDetails;
