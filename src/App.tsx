import { useEffect, useState } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { BurgerIngredient, SupportedIngredientTypes } from './model/burger';
import { ingredients } from './utils/data';

function App() {
	const [staticBun, setStaticBun] = useState<BurgerIngredient | null>(null);
	const [selectedIngredients, setSelectedIngredients] = useState<BurgerIngredient[]>([]);
	useEffect(() => {
		setStaticBun(
			ingredients.find(ingredient => ingredient.type === SupportedIngredientTypes.bun) ??
				null,
		);

		setSelectedIngredients(generateRandomSelectedIngredients());
	}, []);

	return (
		<>
			<AppHeader />
			<main className="main">
				<BurgerIngredients ingredients={ingredients} />
				{staticBun && (
					<BurgerConstructor
						bun={staticBun}
						customIngredients={[...selectedIngredients]}
					/>
				)}
			</main>
		</>
	);
}

export default App;

function generateRandomSelectedIngredients(): BurgerIngredient[] {
	const bunCleanedIngredients = ingredients.filter(
		ingredient => ingredient.type !== SupportedIngredientTypes.bun,
	);
	if (!bunCleanedIngredients.length) {
		return [];
	}

	return bunCleanedIngredients
		.sort(() => Math.random() - 0.5)
		.slice(0, Math.min(bunCleanedIngredients.length, 5));
}
