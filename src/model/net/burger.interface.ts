import { BurgerIngredient } from '../burger';
import { SuccessResponse } from './general.interface';

export interface IngredientsResponse extends SuccessResponse {
	data: BurgerIngredient[];
}
