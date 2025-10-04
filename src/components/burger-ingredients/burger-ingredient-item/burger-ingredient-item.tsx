import { FC, memo } from 'react';
import { BurgerIngredient } from '../../../model/burger';
import styles from './burger-ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useModal } from '../../../hooks/useModal';
import IngredientDetails from '../ingredient-details/ingredient-details';

interface BurgerIngredientItemProps {
	ingredient: BurgerIngredient;
	count?: number;
}

const BurgerIngredientItem: FC<BurgerIngredientItemProps> = memo(({ ingredient, count = 0 }) => {
	const ingredientDetails = <IngredientDetails ingredient={ingredient} />;

	const [isModalOpen, modal, openModal] = useModal('Детали ингредиента', ingredientDetails);

	return (
		<>
			<div className={styles.item} onClick={openModal}>
				<img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
				<div className={`${styles.price} mt-1 mb-1`}>
					<p className="text text_type_digits-default">{ingredient.price}</p>
					<CurrencyIcon type="primary" />
				</div>
				<p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
				<Counter count={count} size="default" />
			</div>
			{isModalOpen && modal}
		</>
	);
});

export default BurgerIngredientItem;
