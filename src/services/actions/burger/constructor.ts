import { BurgerIngredient } from '../../../model/burger';

export enum BurgerSelectedIngredientsActionTypes {
	SET_BURGER_SELECTED_INGREDIENTS = 'SET_BURGER_SELECTED_INGREDIENTS',
	ADD_BURGER_SELECTED_INGREDIENTS = 'ADD_BURGER_SELECTED_INGREDIENTS',
	DELETE_BURGER_SELECTED_INGREDIENTS = 'DELETE_BURGER_SELECTED_INGREDIENTS',
}

type SetBurgerSelectedIngredientsAction = {
	type: BurgerSelectedIngredientsActionTypes.SET_BURGER_SELECTED_INGREDIENTS;
	ingredients: BurgerIngredient[];
};

type AddBurgerSelectedIngredientsAction = {
	type: BurgerSelectedIngredientsActionTypes.ADD_BURGER_SELECTED_INGREDIENTS;
	ingredient: BurgerIngredient;
};

type DeleteBurgerSelectedIngredientsAction = {
	type: BurgerSelectedIngredientsActionTypes.DELETE_BURGER_SELECTED_INGREDIENTS;
	ingredient: BurgerIngredient;
};

export type BurgerSelectedIngredientsActions =
	| SetBurgerSelectedIngredientsAction
	| AddBurgerSelectedIngredientsAction
	| DeleteBurgerSelectedIngredientsAction;
