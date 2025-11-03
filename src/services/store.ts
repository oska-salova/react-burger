import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burger/ingredients';
import burgerConstructorReducer from './burger/constructor';
import orderReducer from './order';
import userReducer from './user';
import authReducer from './auth';

export const store = configureStore({
	reducer: {
		ingredientsReducer,
		burgerConstructorReducer,
		orderReducer,
		userReducer,
		authReducer,
	},
	devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
