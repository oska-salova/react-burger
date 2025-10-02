import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { BurgerIngredient, IngredientType } from './model/burger';
import { ingredients } from './utils/data';

const staticBun = ingredients.find(
	ingredient => ingredient.type === IngredientType.bun,
) as BurgerIngredient;
const selectableIngredients = generateSelectableIngredients();

function App() {
	return (
		<>
			<AppHeader />
			<main className="main">
				<div className="main-content">
					<BurgerIngredients ingredients={ingredients} />
					{staticBun && (
						<BurgerConstructor
							bun={staticBun}
							customIngredients={selectableIngredients}
						/>
					)}
				</div>
			</main>
		</>
	);
}

export default App;

function generateSelectableIngredients(): BurgerIngredient[] {
	return ingredients.filter(ingredient => ingredient.type !== IngredientType.bun);
}
