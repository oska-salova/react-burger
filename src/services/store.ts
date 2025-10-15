import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/burger/ingredients';
import burgerConstructorReducer from './reducers/burger/constructor';
import currentIngredientDetailsReducer from './reducers/burger/ingredient-details';
import orderReducer from './reducers/order';

export const store = configureStore({
	reducer: {
		ingredientsReducer,
		burgerConstructorReducer,
		currentIngredientDetailsReducer,
		orderReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
