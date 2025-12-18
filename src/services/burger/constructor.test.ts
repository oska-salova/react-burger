import { configureStore } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../../model/burger';
import { rootReducer, store as appStore } from '../store';
import { burgerConstructorSlice, initialState as constructorInitialState } from './constructor';

const testBunIngredient: BurgerIngredient = {
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
};

const testNutrientIngredient: BurgerIngredient = {
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
};

const testUUID = '00000000-0000-0000-0000-000000000000';
jest.mock('uuid', () => ({ v4: () => testUUID }));

describe('Constructor reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it('should set provided bun', () => {
		const prevState = rootInitialState;
		expect(
			rootReducer(prevState, burgerConstructorSlice.actions.setBun(testBunIngredient)),
		).toEqual({
			...prevState,
			burgerConstructorReducer: { ...constructorInitialState, bun: testBunIngredient },
		});
	});

	it('should add provided ingredient', () => {
		const prevState = {
			...rootInitialState,
			burgerConstructorReducer: { ...constructorInitialState, bun: testBunIngredient },
		};
		expect(
			rootReducer(
				prevState,
				burgerConstructorSlice.actions.addIngredient(testNutrientIngredient),
			),
		).toEqual({
			...prevState,
			burgerConstructorReducer: {
				...prevState.burgerConstructorReducer,
				ingredients: [{ ...testNutrientIngredient, uuid: testUUID }],
			},
		});
	});

	it('should delete ingredient', () => {
		const constructorIngredient = { ...testNutrientIngredient, uuid: testUUID };
		const prevState = {
			...rootInitialState,
			burgerConstructorReducer: {
				...constructorInitialState,
				bun: testBunIngredient,
				ingredients: [constructorIngredient],
			},
		};
		expect(
			rootReducer(
				prevState,
				burgerConstructorSlice.actions.deleteIngredient(constructorIngredient),
			),
		).toEqual({
			...prevState,
			burgerConstructorReducer: {
				...prevState.burgerConstructorReducer,
				ingredients: [],
			},
		});
	});

	it('should move ingredient to correct position', () => {
		const testUUID1 = testUUID;
		const testUUID2 = testUUID.replaceAll('0', '1');
		const prevState = {
			...rootInitialState,
			burgerConstructorReducer: {
				...constructorInitialState,
				bun: testBunIngredient,
				ingredients: [
					{ ...testNutrientIngredient, uuid: testUUID1 },
					{ ...testNutrientIngredient, uuid: testUUID2 },
				],
			},
		};
		expect(
			rootReducer(
				prevState,
				burgerConstructorSlice.actions.moveIngredient({ fromIndex: 0, toIndex: 1 }),
			),
		).toEqual({
			...prevState,
			burgerConstructorReducer: {
				...prevState.burgerConstructorReducer,
				ingredients: [
					{ ...testNutrientIngredient, uuid: testUUID2 },
					{ ...testNutrientIngredient, uuid: testUUID1 },
				],
			},
		});
	});

	it('should clear bun and ingredients', () => {
		const constructorIngredient = { ...testNutrientIngredient, uuid: testUUID };
		const prevState = {
			...rootInitialState,
			burgerConstructorReducer: {
				...constructorInitialState,
				bun: testBunIngredient,
				ingredients: [constructorIngredient],
			},
		};
		expect(rootReducer(prevState, burgerConstructorSlice.actions.clear())).toEqual(
			rootInitialState,
		);
	});
});
