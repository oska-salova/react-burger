import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-filling.module.css';
import { useAppDispatch } from '../../../services/store';
import { BurgerSelectedIngredientsActionTypes } from '../../../services/actions/burger/constructor';
import { FC } from 'react';
import { ConstructorIngredient } from '../../../model/burger';

interface ConstructorFillingProps {
	ingredient?: ConstructorIngredient;
}

const ConstructorFilling: FC<ConstructorFillingProps> = ({ ingredient }) => {
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch({
			type: BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENT,
			ingredient: ingredient,
		});
	};

	const containerClass = `${styles.container} ${ingredient ? '' : `constructor-element ${styles.empty}`}`;
	return (
		<div className={containerClass}>
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
