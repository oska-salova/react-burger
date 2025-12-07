import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './order-info.module.css';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { getOrderByNumber } from '../../../services/order';
import { orderStatusDict } from '../../../model/order';
import { BurgerIngredient } from '../../../model/burger';
import IngredientCircle from '../order-cards/ingredient-circle/ingredient-circle';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderInfoProps {
	orderNumber: number;
	inModal?: boolean;
}

const OrderInfo = ({ orderNumber, inModal }: OrderInfoProps) => {
	const dispatch = useAppDispatch();
	const feedOrder = useAppSelector(state =>
		state.orderFeedReducer.orders?.find(order => order.number === orderNumber),
	);
	const historyOrder = useAppSelector(state =>
		state.orderFeedReducer.orders?.find(order => order.number === orderNumber),
	);
	const oldRegisteredOrder = useAppSelector(state => state.orderReducer.orders[orderNumber]);
	const order = feedOrder ?? historyOrder ?? oldRegisteredOrder ?? null;
	const allIngredients = useAppSelector(state => state.ingredientsReducer.ingredients);
	const [orderIngredients, setOrderIngredients] = useState<BurgerIngredient[]>([]);

	const isOrderLoading = useAppSelector(state => state.orderReducer.ordersPending);
	const isOrderLoadingError = useAppSelector(state => state.orderReducer.ordersError);
	const isIngredientsLoading = useAppSelector(state => state.ingredientsReducer.loading);
	const isIngredientsLoadingError = useAppSelector(state => state.ingredientsReducer.error);
	const [ingredientsElement, setIngredientsElement] = useState<HTMLUListElement | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		if (!order) {
			dispatch(getOrderByNumber(orderNumber, { signal: controller.signal }));
		}
		return () => {
			controller.abort();
		};
	}, []);

	useEffect(() => {
		if (order && allIngredients.length) {
			const ingredients = order.ingredients.flatMap(ingredientId =>
				allIngredients.filter(ingredient => ingredient._id === ingredientId),
			);
			setOrderIngredients(ingredients);
		}
	}, [order, allIngredients]);

	const burgerPrice = useMemo<number>(() => {
		return orderIngredients.reduce((price, ingredient) => price + ingredient.price, 0);
	}, [orderIngredients]);

	const onRefChange = useCallback((node: HTMLUListElement) => {
		setIngredientsElement(node);
	}, []);

	const updateIngredientsTopPosition = () => {
		if (ingredientsElement) {
			const ingredientsBounds = ingredientsElement.getBoundingClientRect();
			ingredientsElement.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	useLayoutEffect(() => {
		updateIngredientsTopPosition();
		window.addEventListener('resize', updateIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateIngredientsTopPosition);
		};
	}, [ingredientsElement]);

	const getLoadingView = () => {
		return <p className="text text_type_main-default m-2">Order info page: loading...</p>;
	};

	const getErrorView = () => {
		const errorMessage = isOrderLoadingError ?? isIngredientsLoadingError ?? 'Заказ не найден.';

		return <p className="text text_type_main-default m-2 text_color_error">{errorMessage}</p>;
	};

	const getPriceBlock = (price: string) => {
		return (
			<div className={`${styles.price}`}>
				<p className="text text_type_digits-default">{price}</p>
				<CurrencyIcon type="primary" />
			</div>
		);
	};

	const getOrderView = () => {
		return (
			<>
				<div className={styles.header}>
					<p className="text text_type_main-medium">{order.name}</p>
					<p className="text text_type_main-default text_color_success">
						{orderStatusDict[order.status]}
					</p>
				</div>
				<div className={styles.ingredientsBlock}>
					<p className="text text_type_main-medium">Состав:</p>
					<ul className={styles.ingredients} ref={onRefChange}>
						{orderIngredients.map((ingredient, index) => (
							<li key={index} className={styles.ingredient}>
								<div className={styles.ingredientName}>
									<IngredientCircle
										ingredientId={ingredient._id}
										imageUrl={ingredient.image_mobile}
									/>
									<p className="text text_type_main-default">{ingredient.name}</p>
								</div>
								{getPriceBlock('1 x ' + ingredient.price)}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.footer}>
					<FormattedDate
						date={new Date(order.createdAt)}
						className="text text_type_main-default text_color_inactive"
					/>
					{getPriceBlock(burgerPrice.toString())}
				</div>
			</>
		);
	};

	return (
		<section className={styles.details}>
			{order && orderIngredients.length
				? getOrderView()
				: isOrderLoading || isIngredientsLoading || order
					? getLoadingView()
					: getErrorView()}
		</section>
	);
};

export default OrderInfo;
