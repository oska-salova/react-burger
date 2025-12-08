import OrderCards from '../../components/order/order-cards/order-cards';
import styles from './order-history.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect } from 'react';
import { orderHistorySlice } from '../../services/order-history';

function OrderHistoryPage() {
	const dispatch = useAppDispatch();
	const { orders, status, error } = useAppSelector(state => state.orderHistoryReducer);

	useEffect(() => {
		dispatch(orderHistorySlice.actions.connect('wss://norma.education-services.ru/orders'));
		return () => {
			dispatch(orderHistorySlice.actions.disconnect());
		};
	}, []);
	if (status !== 'online' || !orders) {
		return <p className="text text_type_main-default m-2">Идет загрузка заказов...</p>;
	}

	if (error) {
		return <p className="text text_type_main-default m-2 text_color_error">{error}</p>;
	}

	return (
		<section className={`flex-center ${styles.history}`}>
			<OrderCards isHistory={true} orders={orders} />
		</section>
	);
}

export default OrderHistoryPage;
