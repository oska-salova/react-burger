import { BurgerIngredient } from '../../../model/burger';

export enum CurrentBurgerIngredientActionTypes {
	SET_CURRENT_BURGER_INGREDIENT = 'SET_CURRENT_BURGER_INGREDIENT',
	DELETE_CURRENT_BURGER_INGREDIENT = 'DELETE_CURRENT_BURGER_INGREDIENT',
}

type SetCurrentBurgerIngredientAction = {
	type: CurrentBurgerIngredientActionTypes.SET_CURRENT_BURGER_INGREDIENT;
	ingredient: BurgerIngredient;
};

type DeleteCurrentBurgerIngredientAction = {
	type: CurrentBurgerIngredientActionTypes.DELETE_CURRENT_BURGER_INGREDIENT;
};

export type CurrentBurgerIngredientActions =
	| SetCurrentBurgerIngredientAction
	| DeleteCurrentBurgerIngredientAction;
