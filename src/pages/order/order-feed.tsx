import OrderCards from '../../components/order/order-cards/order-cards';
import OrderBoard from '../../components/order/order-board/order-board';
import styles from './order-feed.module.css';
import { orderFeedSlice } from '../../services/order-feed';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';

function OrderFeedPage() {
	const dispatch = useAppDispatch();
	const { orders, status, error, totalOrders, totalTodayOrders } = useAppSelector(
		state => state.orderFeedReducer,
	);

	useEffect(() => {
		dispatch(orderFeedSlice.actions.connect('wss://norma.education-services.ru/orders/all'));
		return () => {
			dispatch(orderFeedSlice.actions.disconnect());
		};
	}, []);

	if (status !== 'online' || !orders) {
		return <p className="text text_type_main-default m-2">Идет загрузка ленты заказов...</p>;
	}

	if (error) {
		return <p className="text text_type_main-default m-2 text_color_error">{error}</p>;
	}

	return (
		<section className={styles.page}>
			<p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
			<section className={styles.feed}>
				<div className={styles.cards}>
					<OrderCards isHistory={false} orders={orders} />
				</div>
				<div className={styles.board}>
					<OrderBoard
						orders={orders}
						totalOrders={totalOrders}
						totalTodayOrders={totalTodayOrders}
					/>
				</div>
			</section>
		</section>
	);
}

export default OrderFeedPage;
