import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient, IngredientType } from '../../model/burger';
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item';

interface BurgerIngredientsProps {
	ingredients: BurgerIngredient[];
}

const GROUP_NAMES: Record<IngredientType, string> = {
	[IngredientType.bun]: 'Булки',
	[IngredientType.sauce]: 'Соусы',
	[IngredientType.main]: 'Начинки',
};

function BurgerIngredients(props: BurgerIngredientsProps) {
	const [currentTab, setCurrentTab] = useState(IngredientType.bun.toString());
	const ingredientsRef = useRef<HTMLDivElement | null>(null);
	const tabContentRefs = useRef<Record<IngredientType, HTMLElement | null>>({
		[IngredientType.bun]: null,
		[IngredientType.sauce]: null,
		[IngredientType.main]: null,
	});
	const [tabsContentVisibility, setTabsContentVisibility] = useState({
		[IngredientType.bun]: false,
		[IngredientType.sauce]: false,
		[IngredientType.main]: false,
	});
	const handleTabContentRefs = (key: IngredientType) => (tabRef: HTMLDivElement) => {
		tabContentRefs.current[key] = tabRef;
	};

	const ingredientGroups = useMemo<Record<IngredientType, BurgerIngredient[]>>(() => {
		return props.ingredients
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
	}, [props.ingredients]);

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
	}, []);

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab);

		if (tabContentRefs?.current) {
			const tabContentElement = tabContentRefs.current[tab as IngredientType];
			tabContentElement?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		if (
			!ingredientsRef.current ||
			!tabContentRefs.current ||
			Object.values(tabContentRefs.current).some(value => !value)
		)
			return;

		const observer = new IntersectionObserver(
			entries => {
				const changedTabs = entries.reduce(
					(cur, entry) => {
						const tab = Object.keys(tabContentRefs.current).find(
							key => tabContentRefs.current[key as IngredientType] === entry.target,
						);
						return { ...cur, [tab as IngredientType]: entry.isIntersecting };
					},
					{} as Record<IngredientType, boolean>,
				);

				setTabsContentVisibility(tabsVisibility => {
					return { ...tabsVisibility, ...changedTabs };
				});

				const newVisibleEntry = entries.find(entry => entry.isIntersecting);
				let newVisibleTab;
				if (newVisibleEntry) {
					newVisibleTab = Object.keys(tabContentRefs.current).find(
						key =>
							tabContentRefs.current[key as IngredientType] ===
							newVisibleEntry?.target,
					);
				} else {
					const newHiddenTabs = entries.map(entry =>
						Object.keys(tabContentRefs.current).find(
							key => tabContentRefs.current[key as IngredientType] === entry.target,
						),
					);
					newVisibleTab = Object.keys(tabsContentVisibility).find(
						tab =>
							tabsContentVisibility[tab as IngredientType] &&
							!newHiddenTabs.includes(tab),
					);
				}
				newVisibleTab && setCurrentTab(newVisibleTab);
			},
			{ threshold: 0, root: ingredientsRef.current },
		);

		Object.values(tabContentRefs.current).forEach(value => {
			observer.observe(value as Element);
		});

		return () => {
			observer.disconnect();
		};
	}, [ingredientsRef, tabContentRefs]);

	return (
		<section className={`${styles.burgerIngredients} mt-10`}>
			<h1 className={`${styles.header} text text_type_main-large mb-5`}>Соберите бургер</h1>
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
			<div className={styles.ingredients} ref={ingredientsRef}>
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
									<BurgerIngredientItem ingredient={ingredient} count={1} />
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}

export default BurgerIngredients;
