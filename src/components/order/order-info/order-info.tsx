import styles from './order-info.module.css';
import { Order } from '../../../model/order';

interface OrderInfoProps {
	order: Order;
}

const OrderInfo = ({ order }: OrderInfoProps) => {
	// useEffect(() => {
	// 	const foundIngredient = ingredients.find(ingredient => ingredient._id === id);
	// 	if (foundIngredient) {
	// 		setIngredient(foundIngredient);
	// 	}
	// }, [ingredients]);

	return (
		<section className={styles.details}>
			<p className="text text_type_main-default">{order.name}</p>
			<section className={styles.nutrients}></section>
		</section>
	);
};

export default OrderInfo;
