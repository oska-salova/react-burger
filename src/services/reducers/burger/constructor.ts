import { BurgerIngredient, ConstructorIngredient } from '../../../model/burger';
import {
	BurgerSelectedIngredientsActionTypes,
	type BurgerSelectedIngredientsActions,
} from '../../actions/burger/constructor';
import { v4 as uuidv4 } from 'uuid';

type SelectedIngredientsState = {
	bun: BurgerIngredient | null;
	ingredients: ConstructorIngredient[];
};

const initialState: SelectedIngredientsState = {
	bun: null,
	ingredients: [],
};

export function selectedIngredientsReducer(
	state = initialState,
	action: BurgerSelectedIngredientsActions,
): SelectedIngredientsState {
	switch (action.type) {
		case BurgerSelectedIngredientsActionTypes.SET_BURGER_SELECTED_BUN:
			return {
				...state,
				bun: { ...action.bun },
			};

		case BurgerSelectedIngredientsActionTypes.ADD_BURGER_SELECTED_INGREDIENT:
			return {
				...state,
				ingredients: [{ ...action.ingredient, uuid: uuidv4() }, ...state.ingredients],
			};

		case BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					ingredient => ingredient.uuid !== action.ingredient.uuid,
				),
			};

		default:
			return state;
	}
}
