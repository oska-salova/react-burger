import { BurgerIngredient } from '../../../model/burger';
import {
	BurgerIngredientsActionTypes,
	type GetBurgerIngredientsActions,
} from '../../actions/burger/ingredients';

type IngredientsState = {
	ingredients: BurgerIngredient[];
	loading: boolean;
	error: string | null;
};

const initialState: IngredientsState = {
	ingredients: [],
	loading: false,
	error: null,
};

export function ingredientsReducer(
	state = initialState,
	action: GetBurgerIngredientsActions,
): IngredientsState {
	switch (action.type) {
		case BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: action.ingredients,
				loading: false,
				error: null,
			};

		case BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_REQUEST:
			return {
				...state,
				ingredients: [],
				loading: true,
				error: null,
			};

		case BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_ERROR:
			return {
				...state,
				ingredients: [],
				loading: false,
				error: action.error,
			};

		default:
			return state;
	}
}
