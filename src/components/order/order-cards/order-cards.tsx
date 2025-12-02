import styles from './order-cards.module.css';
import { Order } from '../../../model/order';
import OrderCard from './order-card/order-card';
import { useLayoutEffect, useRef } from 'react';
import { DEBUG_ORDERS } from '../../../pages/order/order-board/debug';

interface OrderCardsProps {
	isHistory: boolean;
}

function OrderCards({ isHistory }: OrderCardsProps) {
	const orders = DEBUG_ORDERS;
	const cardsRef = useRef<HTMLUListElement | null>(null);

	const handleOrderClick = (order: Order) => {
		console.log('** Order click', order);
		// navigate(AppRoutes.OrderFeed.replace(':id', order._id), {
		// 	state: { backgroundLocation: location },
		// });
	};

	const updateTopPosition = () => {
		if (cardsRef.current) {
			const ingredientsBounds = cardsRef.current.getBoundingClientRect();
			cardsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	useLayoutEffect(() => {
		updateTopPosition();
		window.addEventListener('resize', updateTopPosition);

		return () => {
			window.removeEventListener('resize', updateTopPosition);
		};
	}, []);

	return (
		<ul
			className={`${styles.cards} ${isHistory ? styles.cardsLarge : styles.cardsSmall}`}
			ref={cardsRef}
		>
			{orders.map(order => (
				<li key={order._id} className={styles.card}>
					<OrderCard order={order} onClick={handleOrderClick} showStatus={isHistory} />
				</li>
			))}
		</ul>
	);
}

export default OrderCards;
