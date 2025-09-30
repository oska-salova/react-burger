import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient, IngredientType, SupportedIngredientTypes } from '../../model/burger';
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item';

interface BurgerIngredientsProps {
	ingredients: BurgerIngredient[];
}

const TAB_NAME = {
	[SupportedIngredientTypes.bun]: 'Булки',
	[SupportedIngredientTypes.sauce]: 'Соусы',
	[SupportedIngredientTypes.main]: 'Начинки',
};

function BurgerIngredients(props: BurgerIngredientsProps) {
	const [currentTab, setCurrentTab] = useState(SupportedIngredientTypes.bun.toString());
	const ingredientsRef = useRef<HTMLDivElement | null>(null);

	const ingredientGroups = useMemo(() => {
		return Array.from(
			props.ingredients
				.sort((a, b) => {
					const order = Object.keys(SupportedIngredientTypes);
					const indexA = order.indexOf(a.type);
					const indexB = order.indexOf(b.type);

					return indexA - indexB;
				})
				.reduce((groups, ingredient) => {
					const groupKey = ingredient.type;
					if (!groups.get(groupKey)) {
						groups.set(groupKey, []);
					}
					groups.get(groupKey)?.push(ingredient);
					return groups;
				}, new Map<IngredientType, BurgerIngredient[]>()),
		);
	}, [props.ingredients]);

	const updateIngredientsTopPosition = () => {
		if (ingredientsRef?.current) {
			const ingredientsBounds = ingredientsRef.current.getBoundingClientRect() ?? 0;
			ingredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	useLayoutEffect(() => {
		updateIngredientsTopPosition();
		window.addEventListener('resize', updateIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateIngredientsTopPosition);
		};
	}, []);

	useLayoutEffect(() => {
		if (ingredientsRef?.current) {
			// TODO implement scroll to group header
			ingredientsRef.current.scrollTo({
				top:
					currentTab === SupportedIngredientTypes.sauce
						? 150
						: currentTab === SupportedIngredientTypes.main
							? 250
							: 0,
				behavior: 'smooth',
			});
		}
	}, [currentTab]);

	return (
		<section className={`${styles.burgerIngredients} mt-10`}>
			<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
			<div className={`${styles.tabs} mb-10`}>
				{ingredientGroups.map(([type], index) => {
					return (
						<Tab
							value={type}
							active={currentTab === type}
							onClick={setCurrentTab}
							key={index}
						>
							{TAB_NAME[type]}
						</Tab>
					);
				})}
			</div>
			<div className={styles.ingredients} ref={ingredientsRef}>
				{ingredientGroups.map(([key, ingredients]) => (
					<Fragment key={key}>
						<p className="text text_type_main-medium mb-5">{TAB_NAME[key]}</p>
						<ul className={`${styles.ingredientsGroup}`}>
							{ingredients.map(ingredient => (
								<li key={ingredient._id} className={styles.ingredient}>
									<BurgerIngredientItem ingredient={ingredient} />
								</li>
							))}
						</ul>
					</Fragment>
				))}
			</div>
		</section>
	);
}

export default BurgerIngredients;
