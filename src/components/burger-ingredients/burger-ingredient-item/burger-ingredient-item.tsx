import { FC, memo } from 'react';
import {
	BurgerIngredient,
	DropIngredient,
	IngredientDropType,
	IngredientType,
} from '../../../model/burger';
import styles from './burger-ingredient-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../../../services/store';

interface BurgerIngredientItemProps {
	ingredient: BurgerIngredient;
	count: number;
	onClick: (ingredient: BurgerIngredient) => void;
}

const BurgerIngredientItem: FC<BurgerIngredientItemProps> = memo(
	({ ingredient, count = 0, onClick }) => {
		const isOrderRegistrationInProgress = useAppSelector(state => state.order.registration);

		const handleIngredientClick = () => {
			onClick(ingredient);
		};

		const [, ref] = useDrag({
			type:
				ingredient.type === IngredientType.bun
					? IngredientDropType.bun
					: IngredientDropType.filling,
			item: { id: ingredient._id } as DropIngredient,
			canDrag() {
				return !isOrderRegistrationInProgress;
			},
		});

		return (
			<div className={styles.item} onClick={handleIngredientClick} ref={ref}>
				<img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
				<div className={`${styles.price} mt-1 mb-1`}>
					<p className="text text_type_digits-default">{ingredient.price}</p>
					<CurrencyIcon type="primary" />
				</div>
				<p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
				{!!count && <Counter count={count} size="default" />}
			</div>
		);
	},
);

export default BurgerIngredientItem;
