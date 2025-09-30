import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerIngredient } from '../../model/burger';
import { useEffect, useRef } from 'react';

interface BurgerConstructorProps {
	bun: BurgerIngredient;
	customIngredients: BurgerIngredient[];
}

function BurgerConstructor(props: BurgerConstructorProps) {
	const ingredientsRef = useRef<HTMLUListElement | null>(null);

	const updateCustomIngredientsTopPosition = () => {
		if (ingredientsRef?.current) {
			const ingredientsBounds = ingredientsRef.current.getBoundingClientRect() ?? 0;
			ingredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	useEffect(() => {
		updateCustomIngredientsTopPosition();
		window.addEventListener('resize', updateCustomIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateCustomIngredientsTopPosition);
		};
	}, []);

	return (
		<section className="mt-25">
			<ConstructorElement
				type="top"
				isLocked={true}
				text={props.bun.name}
				price={props.bun.price}
				thumbnail={props.bun.image_mobile}
			/>
			<ul className={styles.customIngredients} ref={ingredientsRef}>
				{props.customIngredients.map(ingredient => (
					<li key={ingredient._id} className={styles.ingredient}>
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
				extraClass="mb-10"
			/>
		</section>
	);
}

export default BurgerConstructor;
