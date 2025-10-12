import { composeWithDevTools } from '@redux-devtools/extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './reducers/burger/ingredients';
import { selectedIngredientsReducer } from './reducers/burger/constructor';
import { currentIngredientReducer } from './reducers/burger/ingredient-details';
import { orderReducer } from './reducers/order';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	selectedIngredients: selectedIngredientsReducer,
	currentIngredient: currentIngredientReducer,
	order: orderReducer,
});

const enhancer =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools(applyMiddleware(thunk))
		: compose(applyMiddleware(thunk));
export const store = createStore(rootReducer, {}, enhancer);

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
