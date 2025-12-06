import styles from './order-info-page.module.css';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../../components/order/order-info/order-info';
import { useAppSelector } from '../../../services/store';
import { useMemo } from 'react';
import { Order } from '../../../model/order';

export const OrderInfoPage = () => {
	const { number } = useParams();
	const isLoading = false; //useAppSelector(state => state.ingredientsReducer.loading);
	const error = null; //useAppSelector(state => state.ingredientsReducer.error);
	const feedOrders = useAppSelector(state => state.orderFeedReducer.orders);
	const historyOrders = useAppSelector(state => state.orderFeedReducer.orders);

	const order = useMemo<Order | null>(() => {
		if (number === undefined) {
			return null;
		}
		return (
			(feedOrders?.concat(historyOrders ?? []) ?? []).find(
				order => order.number === +number,
			) ?? null
		);
	}, [feedOrders, historyOrders]);

	const getLoadingView = () => {
		return <p className="text text_type_main-default m-2">Order info page: loading...</p>;
	};

	const getErrorView = () => {
		const errorMessage = error ?? 'Заказ не найден.';
		return <p className="text text_type_main-default m-2 text_color_error">{errorMessage}</p>;
	};

	return (
		<div className={`flex-center flex-columns ${styles.page}`}>
			{isLoading ? (
				getLoadingView()
			) : error || !order ? (
				getErrorView()
			) : (
				<>
					<p className="text text_type_main-large mb-4">{order.number}</p>
					<OrderInfo order={order} />
				</>
			)}
		</div>
	);
};
