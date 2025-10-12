import { BurgerIngredient } from '../../../model/burger';

export enum BurgerIngredientsActionTypes {
	GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS',
	GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST',
	GET_BURGER_INGREDIENTS_ERROR = 'GET_BURGER_INGREDIENTS_ERROR',
}

type GetBurgerIngredientsSuccessAction = {
	type: BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_SUCCESS;
	ingredients: BurgerIngredient[];
};

type GetBurgerIngredientsRequestAction = {
	type: BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_REQUEST;
};

type GetBurgerIngredientsErrorAction = {
	type: BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_ERROR;
	error: string | null;
};

export type GetBurgerIngredientsActions =
	| GetBurgerIngredientsSuccessAction
	| GetBurgerIngredientsRequestAction
	| GetBurgerIngredientsErrorAction;
