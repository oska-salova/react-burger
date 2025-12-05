import OrderCards from '../../components/order/order-cards/order-cards';
import styles from './order-history.module.css';

function OrderHistoryPage() {
	return (
		<section className={`flex-center ${styles.history}`}>
			<OrderCards isHistory={true} orders={[]} />
		</section>
	);
}

export default OrderHistoryPage;
