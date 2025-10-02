import { BurgerIngredient } from '../burger';

export interface IngredientsResponse {
	success: boolean;
	data: BurgerIngredient[];
}
