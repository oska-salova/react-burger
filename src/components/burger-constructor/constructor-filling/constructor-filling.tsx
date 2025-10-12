import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-filling.module.css';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { BurgerSelectedIngredientsActionTypes } from '../../../services/actions/burger/constructor';
import { FC } from 'react';
import { ConstructorIngredient, DropIngredient, IngredientDropType } from '../../../model/burger';

interface ConstructorFillingProps {
	ingredient?: ConstructorIngredient;
}

const ConstructorFilling: FC<ConstructorFillingProps> = ({ ingredient }) => {
	const dispatch = useAppDispatch();
	const ingredients = useAppSelector(state => state.ingredients.ingredients);

	const [, dropTarget] = useDrop({
		accept: IngredientDropType.filling,
		drop(item) {
			dispatch({
				type: BurgerSelectedIngredientsActionTypes.ADD_BURGER_SELECTED_INGREDIENT,
				ingredient: ingredients.find(
					ingredient => ingredient._id === (item as DropIngredient).id,
				),
			});
		},
	});

	const handleClose = () => {
		dispatch({
			type: BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENT,
			ingredient: ingredient,
		});
	};

	const containerClass = `${styles.container} ${ingredient ? '' : `constructor-element ${styles.empty}`}`;
	return (
		<div className={containerClass} ref={dropTarget}>
			{ingredient ? (
				<>
					<div className="m-2">
						<DragIcon type="primary" />
					</div>
					<ConstructorElement
						text={ingredient.name}
						price={ingredient.price}
						thumbnail={ingredient.image_mobile}
						handleClose={handleClose}
					/>
				</>
			) : (
				<p className={styles.ingredientPlaceholderContent}>Выберите начинку</p>
			)}
		</div>
	);
};

export default ConstructorFilling;
