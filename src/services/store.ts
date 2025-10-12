import { composeWithDevTools } from '@redux-devtools/extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
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

export const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
