import { BurgerIngredient, ConstructorIngredient } from '../../../model/burger';

export enum BurgerSelectedIngredientsActionTypes {
	SET_BURGER_SELECTED_BUN = 'SET_BURGER_SELECTED_BUN',
	ADD_BURGER_SELECTED_INGREDIENT = 'ADD_BURGER_SELECTED_INGREDIENT',
	MOVE_BURGER_SELECTED_INGREDIENT = 'MOVE_BURGER_SELECTED_INGREDIENT',
	DELETE_BURGER_SELECTED_INGREDIENT = 'DELETE_BURGER_SELECTED_INGREDIENT',
}

type SetBurgerSelectedBunAction = {
	type: BurgerSelectedIngredientsActionTypes.SET_BURGER_SELECTED_BUN;
	bun: BurgerIngredient;
};

type AddBurgerSelectedIngredientAction = {
	type: BurgerSelectedIngredientsActionTypes.ADD_BURGER_SELECTED_INGREDIENT;
	ingredient: BurgerIngredient;
};

type MoveBurgerSelectedIngredientAction = {
	type: BurgerSelectedIngredientsActionTypes.MOVE_BURGER_SELECTED_INGREDIENT;
	fromIndex: number;
	toIndex: number;
};

type DeleteBurgerSelectedIngredientAction = {
	type: BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENT;
	ingredient: ConstructorIngredient;
};

export type BurgerSelectedIngredientsActions =
	| SetBurgerSelectedBunAction
	| AddBurgerSelectedIngredientAction
	| MoveBurgerSelectedIngredientAction
	| DeleteBurgerSelectedIngredientAction;
