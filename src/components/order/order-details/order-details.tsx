import styles from './order-details.module.css';
import { OrderStatus } from '../../../model/order';
import { statusComment, statusDescription, statusImages } from './order-details-dictionary';
import { useAppSelector } from '../../../services/store';

const OrderDetails = () => {
	const isLoading = useAppSelector(state => state.order.registration);
	const orderNumber = useAppSelector(state => state.order.order?.number);
	const error = useAppSelector(state => state.order.error);

	const getOrderStatus = (status: OrderStatus) => (
		<>
			<img src={statusImages[status]} alt={status} className="ml-4 mr-4" />
			<p className="text text_type_main-default">{statusDescription[status]}</p>
			<p className="text text_type_main-default text_color_inactive">
				{statusComment[status]}
			</p>
		</>
	);

	if (isLoading) {
		return <p className="text text_type_main-default m-2">Оформление заказа...</p>;
	}

	if (error) {
		return <p className="text text_type_main-default m-2 text_color_error">{error}</p>;
	}

	return (
		<section className={styles.details}>
			<p className={`${styles.orderId} text text_type_digits-large`}>{orderNumber}</p>
			<p className="text text_type_main-small">идентификатор заказа</p>
			{getOrderStatus(OrderStatus.done)}
		</section>
	);
};

export default OrderDetails;
