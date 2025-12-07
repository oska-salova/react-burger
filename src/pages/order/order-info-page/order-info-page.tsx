import styles from './order-info-page.module.css';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../../components/order/order-info/order-info';

export const OrderInfoPage = () => {
	const { number } = useParams();
	const orderNumber = number === undefined ? NaN : +number;

	if (isNaN(orderNumber)) {
		return (
			<p className="text text_type_main-default m-2 text_color_error">
				Неверный номер заказа
			</p>
		);
	}

	return (
		<div className={`flex-center flex-columns ${styles.page}`}>
			<div className={styles.orderNumber}>
				<p className="text text_type_digits-default">#{orderNumber}</p>
			</div>

			<OrderInfo orderNumber={orderNumber} />
		</div>
	);
};
