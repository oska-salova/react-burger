import { configureStore } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../../model/burger';
import { rootReducer, store as appStore } from '../store';
import { getIngredients, initialState as ingredientsInitialState } from './ingredients';

const testIngredients: BurgerIngredient[] = [
	{
		_id: '643d69a5c3f7b9001cfa093c',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	},
	{
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
	{
		_id: '643d69a5c3f7b9001cfa0942',
		name: 'Соус Spicy-X',
		type: 'sauce',
		proteins: 30,
		fat: 20,
		carbohydrates: 40,
		calories: 30,
		price: 90,
		image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
		__v: 0,
	},
];

describe('Ingredients reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it('should set received ingredients to store', () => {
		const prevState = rootInitialState;
		const action = { type: getIngredients.fulfilled.type, payload: testIngredients };
		expect(prevState.ingredientsReducer.ingredients).toEqual([]);

		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			ingredientsReducer: { ...ingredientsInitialState, ingredients: [...testIngredients] },
		});
	});

	it('should add error to store when getIngredients fails', () => {
		const prevState = rootInitialState;
		const errorMessage = 'get ingredients error';
		const action = {
			type: getIngredients.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		expect(prevState.ingredientsReducer.error).toBeNull();

		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			ingredientsReducer: { ...ingredientsInitialState, error: errorMessage },
		});
	});

	it('should set loading to true and reset ingredients when getIngredients is in progress', () => {
		const prevState = {
			...rootInitialState,
			ingredientsReducer: { ...ingredientsInitialState, ingredients: [...testIngredients] },
		};
		expect(prevState.ingredientsReducer.loading).toBe(false);

		const action = {
			type: getIngredients.pending.type,
		};
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			ingredientsReducer: { ...ingredientsInitialState, ingredients: [], loading: true },
		});
	});
});
