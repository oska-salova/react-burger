import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BurgerIngredient, ConstructorIngredient } from '../../model/burger';
import { v4 as uuidv4 } from 'uuid';

type SelectedIngredientsState = {
	bun: BurgerIngredient | null;
	ingredients: ConstructorIngredient[];
};

const initialState: SelectedIngredientsState = {
	bun: null,
	ingredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setBun(state, action: PayloadAction<BurgerIngredient>) {
			state.bun = action.payload;
		},
		addIngredient(state, action: PayloadAction<BurgerIngredient>) {
			state.ingredients.unshift({ ...action.payload, uuid: uuidv4() });
		},
		deleteIngredient(state, action: PayloadAction<ConstructorIngredient>) {
			state.ingredients = state.ingredients.filter(
				ingredient => ingredient.uuid !== action.payload.uuid,
			);
		},
		moveIngredient(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
			state.ingredients.splice(
				action.payload.toIndex,
				0,
				state.ingredients.splice(action.payload.fromIndex, 1)[0],
			);
		},
	},
});

export default burgerConstructorSlice.reducer;
