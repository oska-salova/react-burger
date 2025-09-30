import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { ingredients } from './utils/data';

function App() {
	return (
		<>
			<AppHeader />
			<main className="main">
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor />
			</main>
		</>
	);
}

export default App;
