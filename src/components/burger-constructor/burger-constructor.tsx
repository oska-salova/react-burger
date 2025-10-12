import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerIngredient, IngredientType } from '../../model/burger';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../order/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { BurgerSelectedIngredientsActionTypes } from '../../services/actions/burger/constructor';
import { registerOrder } from '../../services/thunks/order';

function BurgerConstructor() {
	const dispatch = useAppDispatch();
	const ingredients = useAppSelector(state => state.ingredients.ingredients);
	useEffect(() => {
		dispatch({
			type: BurgerSelectedIngredientsActionTypes.SET_BURGER_SELECTED_INGREDIENTS,
			ingredients: ingredients ?? [],
		});
	}, [ingredients]);

	const bun = ingredients.find(
		ingredient => ingredient.type === IngredientType.bun,
	) as BurgerIngredient;
	const customIngredients = ingredients.filter(
		ingredient => ingredient.type !== IngredientType.bun,
	);

	const customIngredientsRef = useRef<HTMLUListElement | null>(null);
	const [isModalOpen, modal, openModal] = useModal('', <OrderDetails />);

	const updateCustomIngredientsTopPosition = () => {
		if (customIngredientsRef?.current) {
			const ingredientsBounds = customIngredientsRef.current.getBoundingClientRect();
			customIngredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	const burgerPrice = customIngredients.reduce(
		(price, ingredient) => price + ingredient.price,
		0,
	);

	useLayoutEffect(() => {
		updateCustomIngredientsTopPosition();
		window.addEventListener('resize', updateCustomIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateCustomIngredientsTopPosition);
		};
	}, [ingredients]);

	const handleOrderButtonClick = () => {
		dispatch(
			registerOrder([
				bun._id,
				...customIngredients.map(ingredient => ingredient._id),
				bun._id,
			]),
		);
		openModal();
	};

	if (!bun) {
		return null;
	}

	return (
		<>
			<section className={`${styles.burgerConstructor}`}>
				<section className={styles.burger}>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
						extraClass="mr-4"
					/>
					<ul className={styles.customIngredients} ref={customIngredientsRef}>
						{customIngredients.map(ingredient => (
							<li key={ingredient._id} className={styles.ingredient}>
								<div className="m-2">
									<DragIcon type="primary" />
								</div>
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image_mobile}
								/>
							</li>
						))}
					</ul>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
						extraClass="mr-4"
					/>
				</section>
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
					>
						Оформить заказ
					</Button>
				</section>
			</section>
			{isModalOpen && modal}
		</>
	);
}

export default BurgerConstructor;
