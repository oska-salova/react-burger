import { FC, memo, useMemo } from 'react';
import styles from './order-card.module.css';
import { Order, OrderStatus } from '../../../../model/order';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCircle from '../ingredient-circle/ingredient-circle';

const orderStatusDict: Record<OrderStatus, string> = {
	[OrderStatus.done]: 'Выполнен',
};

interface OrderCardProps {
	order: Order;
	showStatus: boolean;
	onClick: (order: Order) => void;
}

const OrderCard: FC<OrderCardProps> = memo(({ order, showStatus, onClick }) => {
	const ingredients = order.ingredients;
	const displayedIngredients = order.ingredients.slice(0, 6).reverse();
	const restIngredientsAmount = ingredients.length - displayedIngredients.length;

	const handleIngredientClick = () => {
		onClick(order);
	};

	const burgerPrice = useMemo<number>(() => {
		return ingredients.reduce((price, ingredient) => price + ingredient.price, 0);
	}, [ingredients]);

	return (
		<div className={styles.card} onClick={handleIngredientClick}>
			<div className={styles.cardHeader}>
				<p className="text text_type_digits-default">#{order.number}</p>
				<FormattedDate
					date={new Date(order.createdAt)}
					className="text text_type_main-default text_color_inactive"
				/>
			</div>
			<div className={styles.orderName}>
				<p className="text text_type_main-medium">{order.name}</p>
				{showStatus && (
					<p
						className={`text text_type_main-default ${order.status === OrderStatus.done ? 'text_color_success' : ''}`}
					>
						{orderStatusDict[order.status]}
					</p>
				)}
			</div>
			<div className={styles.orderCost}>
				<ul className={styles.ingredients}>
					{displayedIngredients.map((ingredient, index) => (
						<li key={index} className={styles.ingredient}>
							<IngredientCircle
								ingredientId={ingredient._id}
								imageUrl={ingredient.image_mobile}
								restAmount={
									index === 0 && restIngredientsAmount
										? restIngredientsAmount
										: undefined
								}
							/>
						</li>
					))}
				</ul>
				<div className={`${styles.price}`}>
					<p className="text text_type_digits-default">{burgerPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
});

export default OrderCard;
