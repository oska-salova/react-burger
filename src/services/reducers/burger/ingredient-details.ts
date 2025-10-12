import { BurgerIngredient } from '../../../model/burger';
import {
	CurrentBurgerIngredientActions,
	CurrentBurgerIngredientActionTypes,
} from '../../actions/burger/ingredient-details';

type CurrentIngredientState = {
	ingredient: BurgerIngredient | null;
};

const initialState: CurrentIngredientState = {
	ingredient: null,
};

export function currentIngredientReducer(
	state = initialState,
	action: CurrentBurgerIngredientActions,
): CurrentIngredientState {
	switch (action.type) {
		case CurrentBurgerIngredientActionTypes.SET_CURRENT_BURGER_INGREDIENT:
			return {
				...state,
				ingredient: action.ingredient,
			};

		case CurrentBurgerIngredientActionTypes.DELETE_CURRENT_BURGER_INGREDIENT:
			return {
				...state,
				ingredient: null,
			};

		default:
			return state;
	}
}
