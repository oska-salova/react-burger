import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { BurgerIngredient, IngredientType } from './model/burger';
import { useFetch } from './hooks/net/useFetch';
import { IngredientsResponse } from './model/net/burger.interface';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
	const [isLoading, responseData, error] = useFetch<IngredientsResponse>(INGREDIENTS_URL);

	if (isLoading) {
		return <p className="text text_type_main-default m-2">Loading...</p>;
	}

	if (error || !responseData?.success) {
		const errorMessage = error ? error.message : 'No ingredients found';
		return <p className="text text_type_main-default m-2 text_color_error">{errorMessage}</p>;
	}

	const ingredients = responseData.data as BurgerIngredient[];
	const staticBun = ingredients.find(
		ingredient => ingredient.type === IngredientType.bun,
	) as BurgerIngredient;
	const customIngredients = ingredients.filter(
		ingredient => ingredient.type !== IngredientType.bun,
	);

	return (
		<>
			<AppHeader />
			<main className="main">
				<div className="main-content">
					<BurgerIngredients ingredients={ingredients} />
					{staticBun && (
						<BurgerConstructor bun={staticBun} customIngredients={customIngredients} />
					)}
				</div>
			</main>
		</>
	);
}

export default App;
