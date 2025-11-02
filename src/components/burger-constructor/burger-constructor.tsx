import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../order/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../services/store';
import ConstructorBun from './constructor-bun/constructor-bun';
import ConstructorFilling from './constructor-filling/constructor-filling';
import { useDrop } from 'react-dnd';
import { DragIngredient, IngredientDropType } from '../../model/burger';
import { burgerConstructorSlice } from '../../services/burger/constructor';
import { createOrder, orderSlice } from '../../services/order';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../pages/config';

function BurgerConstructor() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const ingredients = useAppSelector(state => state.ingredientsReducer.ingredients);
	const bun = useAppSelector(state => state.burgerConstructorReducer.bun);
	const customIngredients = useAppSelector(state => state.burgerConstructorReducer.ingredients);
	const orderState = useAppSelector(state => state.orderReducer);
	const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated);
	const [isCreateOrderResultViewed, setCreateOrderResultViewed] = useState(false);

	const customIngredientsRef = useRef<HTMLUListElement | null>(null);
	const [isModalOpen, modal, openModal] = useModal('', <OrderDetails />);

	const [, dropRef] = useDrop({
		accept: IngredientDropType.filling,
		drop(dragItem) {
			const dragIngredient = ingredients.find(
				ingredient => ingredient._id === (dragItem as DragIngredient).id,
			);
			dragIngredient &&
				dispatch(burgerConstructorSlice.actions.addIngredient(dragIngredient));
		},
	});
	dropRef(customIngredientsRef);

	const updateCustomIngredientsTopPosition = () => {
		if (customIngredientsRef.current) {
			const ingredientsBounds = customIngredientsRef.current.getBoundingClientRect();
			customIngredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	const burgerPrice = useMemo<number>(() => {
		return (
			customIngredients.reduce((price, ingredient) => price + ingredient.price, 0) +
			(bun ? bun.price * 2 : 0)
		);
	}, [customIngredients, bun]);

	useLayoutEffect(() => {
		updateCustomIngredientsTopPosition();
		window.addEventListener('resize', updateCustomIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateCustomIngredientsTopPosition);
		};
	}, [ingredients]);

	const handleOrderButtonClick = () => {
		if (bun) {
			setCreateOrderResultViewed(false);
			dispatch(orderSlice.actions.initRegistration());
			if (!isAuthenticated) {
				navigate(AppRoutes.Login);
				return;
			}
			dispatch(
				createOrder([
					bun._id,
					...customIngredients.map(ingredient => ingredient._id),
					bun._id,
				]),
			);
		}
	};

	useEffect(() => {
		if (orderState.error || orderState.order) {
			openModal();

			if (orderState.order) {
				dispatch(burgerConstructorSlice.actions.clear());
			}
		}
	}, [orderState]);

	useEffect(() => {
		if (isModalOpen && (orderState.error || orderState.order)) {
			setCreateOrderResultViewed(true);
		}
		if (isCreateOrderResultViewed && !isModalOpen && (orderState.error || orderState.order)) {
			dispatch(orderSlice.actions.reset());
			setCreateOrderResultViewed(false);
		}
	}, [isModalOpen, orderState, isCreateOrderResultViewed]);

	if (!ingredients.length) {
		return null;
	}

	const customIngredientItems = customIngredients.length ? customIngredients : [undefined];
	return (
		<>
			<section className={`${styles.burgerConstructor}`}>
				<section className={styles.burger}>
					<ConstructorBun type="top" />
					<ul className={styles.customIngredients} ref={customIngredientsRef}>
						{customIngredientItems.map((ingredient, index) => (
							<li
								key={ingredient?.uuid ?? 'empty-filling'}
								className={styles.ingredient}
							>
								<ConstructorFilling ingredient={ingredient} index={index} />
							</li>
						))}
					</ul>
					<ConstructorBun type="bottom" />
				</section>
				{bun && (
					<section className={`${styles.footer} mr-4`}>
						<div className={`${styles.price} mt-1 mb-1`}>
							<p className="text text_type_digits-default">{burgerPrice}</p>
							<CurrencyIcon type="primary" />
						</div>
						<Button
							htmlType="button"
							type="primary"
							size="large"
							onClick={handleOrderButtonClick}
							disabled={orderState.registration}
						>
							{orderState.registration ? 'Оформляем ...' : 'Оформить заказ'}
						</Button>
					</section>
				)}
			</section>
			{isModalOpen && modal}
		</>
	);
}

export default BurgerConstructor;
