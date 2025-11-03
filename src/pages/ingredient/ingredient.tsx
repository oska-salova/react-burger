import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { useAppSelector } from '../../services/store';
import styles from './ingredient.module.css';

export const IngredientPage = () => {
	const isLoading = useAppSelector(state => state.ingredientsReducer.loading);
	const error = useAppSelector(state => state.ingredientsReducer.error);

	const getLoadingView = () => {
		return <p className="text text_type_main-default m-2">Ingredient page: loading......</p>;
	};

	const getErrorView = () => {
		return <p className="text text_type_main-default m-2 text_color_error">{error}</p>;
	};

	return (
		<div className={`flex-center flex-columns ${styles.page}`}>
			{isLoading ? (
				getLoadingView()
			) : error ? (
				getErrorView()
			) : (
				<>
					<p className="text text_type_main-large mb-4">Детали ингредиента</p>
					<IngredientDetails />
				</>
			)}
		</div>
	);
};
