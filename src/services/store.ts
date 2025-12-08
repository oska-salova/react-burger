import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burger/ingredients';
import burgerConstructorReducer from './burger/constructor';
import orderReducer from './order';
import userReducer from './user';
import authReducer from './auth';
import orderFeedReducer, { orderFeedWebSocketMiddleware } from './order-feed';
import orderHistoryReducer, { orderHistoryWebSocketMiddleware } from './order-history';

export const store = configureStore({
	reducer: combineReducers({
		ingredientsReducer,
		burgerConstructorReducer,
		orderReducer,
		userReducer,
		authReducer,
		orderFeedReducer,
		orderHistoryReducer,
	}),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat([
			orderFeedWebSocketMiddleware,
			orderHistoryWebSocketMiddleware,
		]),
	devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
