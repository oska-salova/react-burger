import styles from './ingredient-details.module.css';
import { useAppSelector } from '../../../services/store';

const IngredientDetails = () => {
	const ingredient = useAppSelector(state => state.currentIngredient.ingredient);

	const getNutrient = (title: string, value: number) => (
		<div className={styles.nutrient}>
			<p className="text text_type_main-default text_color_inactive">{title}</p>
			<p className="text text_type_digits-default text_color_inactive">{value}</p>
		</div>
	);

	if (!ingredient) {
		return null;
	}
	return (
		<section className={styles.details}>
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
