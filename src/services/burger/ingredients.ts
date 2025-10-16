import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../../model/burger';
import { IngredientsResponse } from '../../model/net/burger.interface';
import { get } from '../../net/net';

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

const GENERAL_ERROR_MESSAGE = 'An error occurred while retrieving the list of ingredients';

export const getIngredients = createAsyncThunk<BurgerIngredient[]>(
	'ingredients/get',
	async (_, thunkAPI) => {
		return get<IngredientsResponse>('/api/ingredients', {
			signal: thunkAPI.signal,
		})
			.then(result => {
				if (!(result as IngredientsResponse).success) {
					return thunkAPI.rejectWithValue({
						message: GENERAL_ERROR_MESSAGE,
					});
				}
				return (result as IngredientsResponse).data;
			})
			.catch(error => {
				return thunkAPI.rejectWithValue({
					message: error.message ?? GENERAL_ERROR_MESSAGE,
				});
			});
	},
);

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(
				getIngredients.fulfilled,
				(state, action: PayloadAction<BurgerIngredient[]>) => {
					state.ingredients = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(getIngredients.rejected, (state, action) => {
				if (action.meta.aborted) {
					return;
				}
				state.ingredients = [];
				state.loading = false;
				state.error =
					(action.payload as { message: string }).message ?? 'Unexpected network error';
			})
			.addCase(getIngredients.pending, state => {
				state.ingredients = [];
				state.loading = true;
				state.error = null;
			});
	},
});

export default ingredientsSlice.reducer;
