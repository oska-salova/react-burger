import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
	const tabContentRefs = useRef<Partial<Record<IngredientType, HTMLElement | null>>>({});
	const [tabsVisibility, setTabsVisibility] = useState({
		[SupportedIngredientTypes.bun]: false,
		[SupportedIngredientTypes.sauce]: false,
		[SupportedIngredientTypes.main]: false,
	});
	const handleTabContentRefs = (key: IngredientType) => (tabRef: HTMLDivElement) => {
		tabContentRefs.current[key] = tabRef;
	};

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
				const changedTabs: { [tab: string]: boolean } = entries.reduce<{
					[tab: string]: boolean;
				}>((cur, entry) => {
					const tab = Object.keys(tabContentRefs.current).find(
						key => tabContentRefs.current[key as IngredientType] === entry.target,
					);
					return { ...cur, [tab as IngredientType]: entry.isIntersecting };
				}, {});

				setTabsVisibility(tabsVisibility => {
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
					newVisibleTab = Object.keys(tabsVisibility).find(
						tab =>
							tabsVisibility[tab as IngredientType] && !newHiddenTabs.includes(tab),
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
	}, [tabContentRefs]);

	return (
		<section className={`${styles.burgerIngredients} mt-10`}>
			<h1 className={`${styles.header} text text_type_main-large mb-5`}>Соберите бургер</h1>
			<div className={`${styles.tabs} mb-10`}>
				{ingredientGroups.map(([type], index) => {
					return (
						<Tab
							value={type}
							active={currentTab === type}
							onClick={handleTabClick}
							key={index}
						>
							{TAB_NAME[type]}
						</Tab>
					);
				})}
			</div>
			<div className={styles.ingredients} ref={ingredientsRef}>
				{ingredientGroups.map(([key, ingredients]) => (
					<div key={key} ref={handleTabContentRefs(key)}>
						<p
							className={`${styles.ingredientsGroupCaption} text text_type_main-medium mb-5`}
						>
							{TAB_NAME[key]}
						</p>
						<ul className={`${styles.ingredientsGroup}`}>
							{ingredients.map(ingredient => (
								<li key={ingredient._id} className={styles.ingredient}>
									<BurgerIngredientItem ingredient={ingredient} />
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
