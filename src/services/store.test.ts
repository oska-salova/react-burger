import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, store as appStore } from './store';

describe('Store', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it('should return correct initial state', () => {
		expect(rootReducer(undefined, { type: 'unknown' })).toEqual(rootInitialState);
	});

	it('should keep previous state for unknown action', () => {
		const prevState: typeof rootInitialState = {
			...rootInitialState,
			ingredientsReducer: {
				...rootInitialState.ingredientsReducer,
				loading: true,
			},
			burgerConstructorReducer: {
				...rootInitialState.burgerConstructorReducer,
				bun: {
					_id: '643d69a5c3f7b9001cfa0941',
					name: 'Биокотлета из марсианской Магнолии',
					type: 'main',
					proteins: 420,
					fat: 142,
					carbohydrates: 242,
					calories: 4242,
					price: 424,
					image: 'https://code.s3.yandex.net/react/code/meat-01.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
					__v: 0,
				},
			},
		};
		expect(rootReducer(prevState, { type: 'unknown' })).toEqual(prevState);
	});
});
