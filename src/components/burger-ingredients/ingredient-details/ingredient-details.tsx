import styles from './ingredient-details.module.css';
import { useAppSelector } from '../../../services/store';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BurgerIngredient } from '../../../model/burger';

const IngredientDetails = () => {
	const { id } = useParams();
	const [ingredient, setIngredient] = useState<BurgerIngredient | null>(null);
	const ingredients = useAppSelector(state => state.ingredientsReducer.ingredients);

	useEffect(() => {
		const foundIngredient = ingredients.find(ingredient => ingredient._id === id);
		if (foundIngredient) {
			setIngredient(foundIngredient);
		}
	}, [ingredients]);

	const getNutrient = (title: string, value: number) => (
		<div className={styles.nutrient}>
			<p className="text text_type_main-default text_color_inactive">{title}</p>
			<p className="text text_type_digits-default text_color_inactive">{value}</p>
		</div>
	);

	if (!ingredient) {
		return <p className="text text_type_main-small">Получаем данные ...</p>;
	}
	return (
		<section className={styles.details} data-testid="ingredient-details">
			<img src={ingredient.image_large} alt={ingredient.name} className="ml-4 mr-4" />
			<p className="text text_type_main-small">{ingredient.name}</p>
			<section className={styles.nutrients}>
				{getNutrient('Калории, ккал', ingredient.calories)}
				{getNutrient('Белки, г', ingredient.proteins)}
				{getNutrient('Жиры, г', ingredient.fat)}
				{getNutrient('Углеводы, г', ingredient.carbohydrates)}
			</section>
		</section>
	);
};

export default IngredientDetails;
