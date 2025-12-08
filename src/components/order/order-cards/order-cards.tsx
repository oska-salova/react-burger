import styles from './order-cards.module.css';
import { Order } from '../../../model/order';
import OrderCard from './order-card/order-card';
import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface OrderCardsProps {
	orders: Order[];
	isHistory: boolean;
}

function OrderCards({ orders, isHistory }: OrderCardsProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const cardsRef = useRef<HTMLUListElement | null>(null);

	const handleOrderClick = (order: Order) => {
		navigate(`${location.pathname}/${order.number}`, {
			state: { backgroundLocation: location, orderNumber: order.number },
		});
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
