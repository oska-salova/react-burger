import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerIngredient } from '../../model/burger';
import { useLayoutEffect, useRef } from 'react';

interface BurgerConstructorProps {
	bun: BurgerIngredient;
	customIngredients: BurgerIngredient[];
	price: number;
}

function BurgerConstructor(props: BurgerConstructorProps) {
	const ingredientsRef = useRef<HTMLUListElement | null>(null);

	const updateCustomIngredientsTopPosition = () => {
		if (ingredientsRef?.current) {
			const ingredientsBounds = ingredientsRef.current.getBoundingClientRect() ?? 0;
			ingredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	useLayoutEffect(() => {
		updateCustomIngredientsTopPosition();
		window.addEventListener('resize', updateCustomIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateCustomIngredientsTopPosition);
		};
	}, []);

	return (
		<section className={`${styles.burgerConstructor} mt-25`}>
			<section className={styles.burger}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text={props.bun.name}
					price={props.bun.price}
					thumbnail={props.bun.image_mobile}
					extraClass="mr-4"
				/>
				<ul className={styles.customIngredients} ref={ingredientsRef}>
					{props.customIngredients.map(ingredient => (
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
					text={props.bun.name}
					price={props.bun.price}
					thumbnail={props.bun.image_mobile}
					extraClass="mr-4"
				/>
			</section>
			<section className={`${styles.footer} mr-4`}>
				<div className={`${styles.price} mt-1 mb-1`}>
					<p className="text text_type_digits-default">{props.price}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</section>
		</section>
	);
}

export default BurgerConstructor;
