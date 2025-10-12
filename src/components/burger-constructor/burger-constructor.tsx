import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../order/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { registerOrder } from '../../services/thunks/order';
import ConstructorBun from './constructor-bun/constructor-bun';
import ConstructorFilling from './constructor-filling/constructor-filling';
import { useDrop } from 'react-dnd';
import { DropIngredient, IngredientDropType } from '../../model/burger';
import { BurgerSelectedIngredientsActionTypes } from '../../services/actions/burger/constructor';

function BurgerConstructor() {
	const dispatch = useAppDispatch();
	const ingredients = useAppSelector(state => state.ingredients.ingredients);
	const bun = useAppSelector(state => state.selectedIngredients.bun);
	const customIngredients = useAppSelector(state => state.selectedIngredients.ingredients);
	const orderState = useAppSelector(state => state.order);

	const customIngredientsRef = useRef<HTMLUListElement | null>(null);
	const [isModalOpen, modal, openModal] = useModal('', <OrderDetails />);

	const [, dropRef] = useDrop({
		accept: IngredientDropType.filling,
		drop(item) {
			dispatch({
				type: BurgerSelectedIngredientsActionTypes.ADD_BURGER_SELECTED_INGREDIENT,
				ingredient: ingredients.find(
					ingredient => ingredient._id === (item as DropIngredient).id,
				),
			});
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
			dispatch(
				registerOrder([
					bun._id,
					...customIngredients.map(ingredient => ingredient._id),
					bun._id,
				]),
			);
		}
	};

	useEffect(() => {
		if (orderState.error || orderState.order) openModal();
	}, [orderState]);

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
						{customIngredientItems.map(ingredient => (
							<li
								key={ingredient?.uuid ?? 'empty-filling'}
								className={styles.ingredient}
							>
								<ConstructorFilling ingredient={ingredient} />
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
							Оформить заказ
						</Button>
					</section>
				)}
			</section>
			{isModalOpen && modal}
		</>
	);
}

export default BurgerConstructor;
