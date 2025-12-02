import OrderCards from '../../components/order/order-cards/order-cards';
import OrderBoard from './order-board/order-board';
import styles from './order-feed.module.css';

function OrderFeedPage() {
	return (
		<section className={styles.page}>
			<p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
			<section className={styles.feed}>
				<div className={styles.cards}>
					<OrderCards isHistory={false} />
				</div>
				<div className={styles.board}>
					<OrderBoard />
				</div>
			</section>
		</section>
	);
}

export default OrderFeedPage;
