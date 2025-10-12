import { Provider } from 'react-redux';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { store } from './services/store';

function App() {
	return (
		<Provider store={store}>
			<AppHeader />
			<main className="main">
				<div className="main-content">
					<BurgerIngredients />
					<BurgerConstructor />
				</div>
			</main>
		</Provider>
	);
}

export default App;
