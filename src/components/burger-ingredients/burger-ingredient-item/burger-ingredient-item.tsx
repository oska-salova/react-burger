import { FC, memo } from 'react';
import { BurgerIngredient } from '../../../model/burger';
import styles from './burger-ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface BurgerIngredientItemProps {
	ingredient: BurgerIngredient;
	count?: number;
}

const BurgerIngredientItem: FC<BurgerIngredientItemProps> = memo(({ ingredient, count = 0 }) => {
	return (
		<div className={styles.item}>
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={`${styles.icon} ml-4 mr-4`}
			/>
			<div className={`${styles.price} mt-1 mb-1`}>
				<p className="text text_type_digits-default">{ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
			<Counter count={count} size="default" />
		</div>
	);
});

export default BurgerIngredientItem;
