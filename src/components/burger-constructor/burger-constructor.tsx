import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerIngredient } from '../../model/burger';
import { useLayoutEffect, useRef } from 'react';
import { useModal } from '../../hooks/useModal';

interface BurgerConstructorProps {
	bun: BurgerIngredient;
	customIngredients: BurgerIngredient[];
}

function BurgerConstructor(props: BurgerConstructorProps) {
	const customIngredientsRef = useRef<HTMLUListElement | null>(null);
	const [isModalOpen, modal, openModal] = useModal();

	const updateCustomIngredientsTopPosition = () => {
		if (customIngredientsRef?.current) {
			const ingredientsBounds = customIngredientsRef.current.getBoundingClientRect();
			customIngredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	const burgerPrice = props.customIngredients.reduce(
		(price, ingredient) => price + ingredient.price,
		0,
	);

	useLayoutEffect(() => {
		updateCustomIngredientsTopPosition();
		window.addEventListener('resize', updateCustomIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateCustomIngredientsTopPosition);
		};
	}, []);

	return (
		<>
			<section className={`${styles.burgerConstructor}`}>
				<section className={styles.burger}>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={props.bun.name}
						price={props.bun.price}
						thumbnail={props.bun.image_mobile}
						extraClass="mr-4"
					/>
					<ul className={styles.customIngredients} ref={customIngredientsRef}>
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
						<p className="text text_type_digits-default">{burgerPrice}</p>
						<CurrencyIcon type="primary" />
					</div>
					<Button htmlType="button" type="primary" size="large" onClick={openModal}>
						Оформить заказ
					</Button>
				</section>
			</section>
			{isModalOpen && modal}
		</>
	);
}

export default BurgerConstructor;
