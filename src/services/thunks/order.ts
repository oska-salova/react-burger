import { isAbortError } from '../../model/net/http-error';
import { RegisterOrderErrorResponse, RegisterOrderResponse } from '../../model/net/order.interface';
import { OrderActionTypes } from '../actions/order';
import { setData } from '../net/post';
import { AppDispatch } from '../store';

const ORDERS_URL = 'https://norma.nomoreparties.space/api/orders';

export const registerOrder = (ingredientIds: string[]) => async (dispatch: AppDispatch) => {
	dispatch({
		type: OrderActionTypes.SET_ORDER_REQUEST,
	});

	const [responseData, error] = await setData<RegisterOrderResponse | RegisterOrderErrorResponse>(
		ORDERS_URL,
		{
			ingredients: ingredientIds,
		},
	);

	if (responseData?.success || responseData?.message) {
		if (responseData.success) {
			dispatch({
				type: OrderActionTypes.SET_ORDER_SUCCESS,
				orderNumber: responseData.order.number ?? [],
			});
		} else {
			dispatch({
				type: OrderActionTypes.SET_ORDER_ERROR,
				error: responseData.message,
			});
		}
	} else {
		const isAbortErrorOccurred = !!error && isAbortError(error);
		if (!isAbortErrorOccurred) {
			dispatch({
				type: OrderActionTypes.SET_ORDER_ERROR,
				error: error?.message || 'An error occurred while registering the order.',
			});
		}
	}
};
