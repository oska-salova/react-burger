import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-filling.module.css';
import { useAppDispatch } from '../../../services/store';
import { BurgerSelectedIngredientsActionTypes } from '../../../services/actions/burger/constructor';
import { FC, useRef } from 'react';
import { ConstructorIngredient } from '../../../model/burger';
import { useDrag, useDrop } from 'react-dnd';

const INTERNAL_DRAG_DROP_TYPE = 'constructor-ingredient';

export interface DragItem {
	id: string;
	index: number;
}

interface ConstructorFillingProps {
	ingredient?: ConstructorIngredient;
	index: number;
}

const ConstructorFilling: FC<ConstructorFillingProps> = ({ ingredient, index }) => {
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch({
			type: BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENT,
			ingredient: ingredient,
		});
	};

	const ref = useRef<HTMLDivElement>(null);
	const [, dropRef] = useDrop({
		accept: INTERNAL_DRAG_DROP_TYPE,
		drop(dragItem) {
			dispatch({
				type: BurgerSelectedIngredientsActionTypes.MOVE_BURGER_SELECTED_INGREDIENT,
				fromIndex: (dragItem as DragItem).index,
				toIndex: index,
			});
		},
	});

	const [, dragRef] = useDrag({
		type: INTERNAL_DRAG_DROP_TYPE,
		item: () => {
			return { id: ingredient?.uuid, index } as DragItem;
		},
		canDrag() {
			return !!ingredient;
		},
	});

	dragRef(dropRef(ref));

	const containerClass = `${styles.container} ${ingredient ? '' : `constructor-element ${styles.empty}`}`;
	return (
		<div className={containerClass} ref={ref}>
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
