import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient, IngredientType } from '../../model/burger';
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item';
import { useAppSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../pages/config';

const GROUP_NAMES: Record<IngredientType, string> = {
	[IngredientType.bun]: 'Булки',
	[IngredientType.sauce]: 'Соусы',
	[IngredientType.main]: 'Начинки',
};

function BurgerIngredients() {
	const location = useLocation();
	const navigate = useNavigate();
	const isLoading = useAppSelector(state => state.ingredientsReducer.loading);
	const ingredients = useAppSelector(state => state.ingredientsReducer.ingredients);
	const error = useAppSelector(state => state.ingredientsReducer.error);
	const selectedIngredients = useAppSelector(state => state.burgerConstructorReducer.ingredients);
	const selectedBun = useAppSelector(state => state.burgerConstructorReducer.bun);

	const [currentTab, setCurrentTab] = useState(IngredientType.bun.toString());
	const ingredientsRef = useRef<HTMLDivElement | null>(null);
	const tabContentRefs = useRef<Record<IngredientType, HTMLElement | null>>({
		[IngredientType.bun]: null,
		[IngredientType.sauce]: null,
		[IngredientType.main]: null,
	});
	const handleTabContentRefs = (key: IngredientType) => (tabRef: HTMLDivElement) => {
		tabContentRefs.current[key] = tabRef;
	};

	const selectedIngredientCounts = useMemo<Record<string, number>>(() => {
		const source = selectedBun ? { [selectedBun._id]: 2 } : {};
		return selectedIngredients.reduce((counts, ingredient) => {
			counts[ingredient._id] ??= 0;
			counts[ingredient._id] += 1;
			return counts;
		}, source);
	}, [selectedIngredients, selectedBun]);

	const ingredientGroups = useMemo<Record<IngredientType, BurgerIngredient[]>>(() => {
		return [...ingredients]
			.sort((a, b) => {
				const order = Object.keys(IngredientType);
				const indexA = order.indexOf(a.type);
				const indexB = order.indexOf(b.type);

				return indexA - indexB;
			})
			.reduce(
				(groups, ingredient) => {
					groups[ingredient.type] ??= [];
					groups[ingredient.type].push(ingredient);
					return groups;
				},
				{} as { [key in IngredientType]: BurgerIngredient[] },
			);
	}, [ingredients]);

	const updateIngredientsTopPosition = () => {
		if (ingredientsRef?.current) {
			const ingredientsBounds = ingredientsRef.current.getBoundingClientRect();
			ingredientsRef.current.style.setProperty('--top', `${ingredientsBounds.top}px`);
		}
	};

	useLayoutEffect(() => {
		updateIngredientsTopPosition();
		window.addEventListener('resize', updateIngredientsTopPosition);

		return () => {
			window.removeEventListener('resize', updateIngredientsTopPosition);
		};
	}, [ingredients]);

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab);

		if (tabContentRefs?.current) {
			const tabContentElement = tabContentRefs.current[tab as IngredientType];
			tabContentElement?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleIngredientsScroll = () => {
		if (
			!ingredientsRef.current ||
			!tabContentRefs.current ||
			Object.values(tabContentRefs.current).some(value => !value)
		)
			return;

		const ingredientContainerTop = ingredientsRef.current.getBoundingClientRect().top;
		const contentHeaderTops = Object.values(tabContentRefs.current).map(
			value => value?.getBoundingClientRect().top ?? Infinity,
		);

		let minIndex = 0;
		let curMinDistance = Math.abs(ingredientContainerTop - contentHeaderTops[minIndex]);
		contentHeaderTops.forEach((contentHeaderTop: number, index: number) => {
			const distance = Math.abs(ingredientContainerTop - contentHeaderTop);
			if (distance < curMinDistance) {
				curMinDistance = distance;
				minIndex = index;
			}
		});

		const tab = Object.keys(tabContentRefs.current)[minIndex];
		setCurrentTab(tab);
	};

	const handleIngredientClick = (ingredient: BurgerIngredient) => {
		navigate(AppRoutes.Ingredient.replace(':id', ingredient._id), {
			state: { backgroundLocation: location },
		});
	};

	if (isLoading) {
		return <p className="text text_type_main-default m-2">BurgerIngredients: loading...</p>;
	}

	if (error) {
		return <p className="text text_type_main-default m-2 text_color_error">{error}</p>;
	}

	return (
		<>
			<section className={`${styles.burgerIngredients} mt-10`}>
				<h1 className={`${styles.header} text text_type_main-large mb-5`}>
					Соберите бургер
				</h1>
				<div className={`${styles.tabs} mb-10`}>
					{Object.keys(ingredientGroups).map((type, index) => {
						return (
							<Tab
								value={type}
								active={currentTab === type}
								onClick={handleTabClick}
								key={index}
							>
								{GROUP_NAMES[type as IngredientType]}
							</Tab>
						);
					})}
				</div>
				<div
					className={styles.ingredients}
					ref={ingredientsRef}
					onScroll={handleIngredientsScroll}
				>
					{Object.entries(ingredientGroups).map(([type, ingredients]) => (
						<div key={type} ref={handleTabContentRefs(type as IngredientType)}>
							<p
								className={`${styles.ingredientsGroupCaption} text text_type_main-medium mb-5`}
							>
								{GROUP_NAMES[type as IngredientType]}
							</p>
							<ul className={`${styles.ingredientsGroup}`}>
								{ingredients.map(ingredient => (
									<li key={ingredient._id} className={styles.ingredient}>
										<BurgerIngredientItem
											ingredient={ingredient}
											count={selectedIngredientCounts[ingredient._id]}
											onClick={handleIngredientClick}
										/>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>
		</>
	);
}

export default BurgerIngredients;
