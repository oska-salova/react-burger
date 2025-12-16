import { BurgerIngredient } from '../../model/burger';
import reducer, { burgerConstructorSlice } from './constructor';

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
	it('should return initial state with no bun and empty ingredients', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({ bun: null, ingredients: [] });
	});

	it('should set provided bun', () => {
		expect(
			reducer(
				{ bun: null, ingredients: [] },
				burgerConstructorSlice.actions.setBun(testBunIngredient),
			),
		).toEqual({
			bun: testBunIngredient,
			ingredients: [],
		});
	});

	it('should add provided ingredient', () => {
		expect(
			reducer(
				{ bun: testBunIngredient, ingredients: [] },
				burgerConstructorSlice.actions.addIngredient(testNutrientIngredient),
			),
		).toEqual({
			bun: testBunIngredient,
			ingredients: [{ ...testNutrientIngredient, uuid: testUUID }],
		});
	});

	it('should delete ingredient', () => {
		const constructorIngredient = { ...testNutrientIngredient, uuid: testUUID };
		expect(
			reducer(
				{
					bun: testBunIngredient,
					ingredients: [constructorIngredient],
				},
				burgerConstructorSlice.actions.deleteIngredient(constructorIngredient),
			),
		).toEqual({
			bun: testBunIngredient,
			ingredients: [],
		});
	});

	it('should clear bun and ingredients', () => {
		const constructorIngredient = { ...testNutrientIngredient, uuid: testUUID };
		expect(
			reducer(
				{
					bun: testBunIngredient,
					ingredients: [constructorIngredient],
				},
				burgerConstructorSlice.actions.clear(),
			),
		).toEqual({
			bun: null,
			ingredients: [],
		});
	});
});
