export enum SupportedIngredientTypes {
	bun = 'bun',
	sauce = 'sauce',
	main = 'main',
}

export type IngredientType = `${SupportedIngredientTypes}`;

export interface BurgerIngredient {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}
