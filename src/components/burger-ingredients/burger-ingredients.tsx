import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient, IngredientType } from '../../model/burger';
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item';
import IngredientDetails from './ingredient-details/ingredient-details';
import { useModal } from '../../hooks/useModal';
import { getIngredients } from '../../services/thunks/burger/ingredients';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { CurrentBurgerIngredientActionTypes } from '../../services/actions/burger/ingredient-details';

const GROUP_NAMES: Record<IngredientType, string> = {
	[IngredientType.bun]: 'Булки',
	[IngredientType.sauce]: 'Соусы',
	[IngredientType.main]: 'Начинки',
};

function BurgerIngredients() {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(state => state.ingredients.loading);
	const ingredients = useAppSelector(state => state.ingredients.ingredients);
	const error = useAppSelector(state => state.ingredients.error);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

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

	const ingredientGroups = useMemo<Record<IngredientType, BurgerIngredient[]>>(() => {
		return ingredients
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

	const [isModalOpen, modal, openModal] = useModal('Детали ингредиента');
	const handleIngredientClick = (ingredient: BurgerIngredient) => {
		dispatch({
			type: CurrentBurgerIngredientActionTypes.SET_CURRENT_BURGER_INGREDIENT,
			ingredient: ingredient,
		});
		openModal(<IngredientDetails />);
	};

	useEffect(() => {
		if (!isModalOpen) {
			dispatch({
				type: CurrentBurgerIngredientActionTypes.DELETE_CURRENT_BURGER_INGREDIENT,
			});
		}
	}, [isModalOpen]);

	if (isLoading) {
		return <p className="text text_type_main-default m-2">Loading...</p>;
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
							<ul
								className={`${styles.ingredientsGroup}`}
								// onScroll={handleListScroll}
							>
								{ingredients.map(ingredient => (
									<li
										key={ingredient._id}
										className={styles.ingredient}
										// onScroll={handleListScroll}
									>
										<BurgerIngredientItem
											ingredient={ingredient}
											count={1}
											onClick={handleIngredientClick}
										/>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>
			{isModalOpen && modal}
		</>
	);
}

export default BurgerIngredients;
