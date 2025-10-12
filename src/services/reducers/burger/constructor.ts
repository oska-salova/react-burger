import { BurgerIngredient } from '../../../model/burger';
import {
	BurgerSelectedIngredientsActionTypes,
	type BurgerSelectedIngredientsActions,
} from '../../actions/burger/constructor';

type SelectedIngredientsState = {
	ingredients: BurgerIngredient[];
};

const initialState: SelectedIngredientsState = {
	ingredients: [],
};

export function selectedIngredientsReducer(
	state = initialState,
	action: BurgerSelectedIngredientsActions,
): SelectedIngredientsState {
	switch (action.type) {
		case BurgerSelectedIngredientsActionTypes.SET_BURGER_SELECTED_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
			};

		case BurgerSelectedIngredientsActionTypes.ADD_BURGER_SELECTED_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, action.ingredient],
			};

		case BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENTS:
			return {
				...state,
				ingredients: state.ingredients.filter(
					ingredient => ingredient._id !== action.ingredient._id,
				),
			};

		default:
			return state;
	}
}
