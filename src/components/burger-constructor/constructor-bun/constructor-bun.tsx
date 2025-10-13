import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-bun.module.css';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { BurgerSelectedIngredientsActionTypes } from '../../../services/actions/burger/constructor';
import { FC } from 'react';
import { DragIngredient, IngredientDropType } from '../../../model/burger';

interface ConstructorBunProps {
	type: 'top' | 'bottom';
}
const ConstructorBun: FC<ConstructorBunProps> = ({ type }) => {
	const dispatch = useAppDispatch();
	const ingredients = useAppSelector(state => state.ingredients.ingredients);
	const selectedBun = useAppSelector(state => state.selectedIngredients.bun);

	const [{ isHover }, dropTarget] = useDrop({
		accept: IngredientDropType.bun,
		collect: monitor => ({
			isHover: monitor.isOver() && monitor.canDrop(),
		}),
		drop(dragItem) {
			dispatch({
				type: BurgerSelectedIngredientsActionTypes.SET_BURGER_SELECTED_BUN,
				bun: ingredients.find(
					ingredient => ingredient._id === (dragItem as DragIngredient).id,
				),
			});
		},
		canDrop(item) {
			return (item as DragIngredient).id !== selectedBun?._id;
		},
	});

	const containerClass = selectedBun
		? ''
		: `constructor-element constructor-element_pos_${type} ${isHover ? 'dragHover' : ''}`;

	return (
		<div ref={dropTarget} className={`${containerClass} mr-4`}>
			{selectedBun ? (
				<ConstructorElement
					type={type}
					isLocked={true}
					text={`${selectedBun.name} (${type === 'top' ? 'верх' : 'низ'})`}
					price={selectedBun.price}
					thumbnail={selectedBun.image_mobile}
					extraClass={`${isHover ? 'dragHover' : ''}`}
				/>
			) : (
				<p className={styles.ingredientPlaceholderContent}>Выберите булку</p>
			)}
		</div>
	);
};

export default ConstructorBun;
