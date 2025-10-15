import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../../../model/burger';

type CurrentIngredientState = {
	ingredient: BurgerIngredient | null;
};

const initialState: CurrentIngredientState = {
	ingredient: null,
};

export const currentIngredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		set(state, action: PayloadAction<BurgerIngredient>) {
			state.ingredient = action.payload;
		},
		delete(state) {
			state.ingredient = null;
		},
	},
});

export default currentIngredientDetailsSlice.reducer;
