import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { useEffect } from 'react';
import { getIngredients } from '../../services/burger/ingredients';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { currentIngredientDetailsSlice } from '../../services/burger/ingredient-details';
import styles from './ingredient.module.css';

export const IngredientPage = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const isLoading = useAppSelector(state => state.ingredientsReducer.loading);
	const ingredients = useAppSelector(state => state.ingredientsReducer.ingredients);
	const error = useAppSelector(state => state.ingredientsReducer.error);

	useEffect(() => {
		const controller = new AbortController();
		dispatch(getIngredients(undefined, { signal: controller.signal }));
		return () => {
			controller.abort();
		};
	}, [dispatch]);

	useEffect(() => {
		const foundIngredient = ingredients.find(ingredient => ingredient._id === params.id);

		if (foundIngredient) {
			dispatch(currentIngredientDetailsSlice.actions.set(foundIngredient));
		}
	}, [ingredients]);

	const getLoadingView = () => {
		return <p className="text text_type_main-default m-2">Loading...</p>;
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
