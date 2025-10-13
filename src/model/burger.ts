export enum IngredientType {
	bun = 'bun',
	sauce = 'sauce',
	main = 'main',
}

export interface BurgerIngredient {
	_id: string;
	name: string;
	type: keyof typeof IngredientType;
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

export interface ConstructorIngredient extends BurgerIngredient {
	uuid: string;
}

export interface DragIngredient {
	id: string;
}

export enum IngredientDropType {
	bun = 'bun',
	filling = 'filling',
}
