import { OrderStatus } from '../../../model/order';
import { DEBUG_ORDERS } from './debug';
import styles from './order-board.module.css';

function OrderBoard() {
	const orders = DEBUG_ORDERS;
	const readyOrders = orders.filter(order => order.status === OrderStatus.done).slice(0, 10);
	const progressOrders = orders
		.filter(order => order.status === OrderStatus.in_progress)
		.slice(0, 10);
	const totalOrders = 150;
	const totalTodayOrders = 15;

	const getOrdersQueueBlock = (ready = false) => {
		const queueOrders = ready ? readyOrders : progressOrders;
		return (
			<div>
				<p className="text text_type_main-default mb-6">{ready ? 'Готовы' : 'В работе'}:</p>
				<ul className={styles.orders}>
					{queueOrders.map(order => (
						<li key={order._id} className={styles.orderNumber}>
							<p
								className={`text text_type_digits-default ${ready ? 'text_color_success' : ''}`}
							>
								{order.number}
							</p>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<section className={styles.page}>
			<div className={styles.orderQueues}>
				{getOrdersQueueBlock(true)}
				{getOrdersQueueBlock()}
			</div>
			<p className="text text_type_main-default">Выполнено за все время:</p>
			<p className={`text text_type_digits-large mb-15 ${styles.amount}`}>{totalOrders}</p>
			<p className="text text_type_main-default">Выполнено за сегодня:</p>
			<p className={`text text_type_digits-large ${styles.amount}`}>{totalTodayOrders}</p>
		</section>
	);
}

export default OrderBoard;
