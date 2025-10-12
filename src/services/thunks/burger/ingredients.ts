import { IngredientsResponse } from '../../../model/net/burger.interface';
import { isAbortError } from '../../../model/net/http-error';
import { BurgerIngredientsActionTypes } from '../../actions/burger/ingredients';
import { getData } from '../../net/get';
import { AppDispatch } from '../../store';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => async (dispatch: AppDispatch) => {
	dispatch({
		type: BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_REQUEST,
	});

	const [responseData, error] = await getData<IngredientsResponse>(INGREDIENTS_URL);

	if (responseData?.success) {
		dispatch({
			type: BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_SUCCESS,
			ingredients: responseData.data ?? [],
		});
	} else {
		const isAbortErrorOccurred = !!error && isAbortError(error);
		if (!isAbortErrorOccurred) {
			dispatch({
				type: BurgerIngredientsActionTypes.GET_BURGER_INGREDIENTS_ERROR,
				error: error
					? error.message || 'An error occurred while retrieving the list of ingredients'
					: 'No ingredients found',
			});
		}
	}
};
