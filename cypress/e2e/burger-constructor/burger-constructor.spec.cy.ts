import { mockGetIngredients } from '../../mocks/mocks';

describe('burger constructor', function () {
	beforeEach(() => {
		cy.visit('/');
		mockGetIngredients();
		cy.wait('@ingredients');
	});

	it('should add 2 buns to burger when bun drops to burger bun placeholder', () => {
		cy.get('[data-testid="constructor-bun-top"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-bottom"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-top"]').contains('Выберите булку').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').contains('Выберите булку').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
		cy.get('[data-testid="constructor-bun-top"]').trigger('drop');

		cy.get('[data-testid="constructor-bun-top"]').find('img').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').find('img').should('exist');
		cy.get('[data-testid="constructor-bun-top"]')
			.contains('Выберите булку')
			.should('not.exist');
		cy.get('[data-testid="constructor-bun-bottom"]')
			.contains('Выберите булку')
			.should('not.exist');
	});

	it('should not add fillings when drops to burger bun placeholder', () => {
		cy.get('[data-testid="constructor-bun-top"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-bottom"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-top"]').contains('Выберите булку').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').contains('Выберите булку').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093e"]').trigger('dragstart');
		cy.get('[data-testid="constructor-bun-top"]').trigger('drop');

		cy.get('[data-testid="constructor-bun-top"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-bottom"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-top"]').contains('Выберите булку').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').contains('Выберите булку').should('exist');
	});

	it('should add filling when drops to burger filling placeholder', () => {
		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093e"]').trigger('dragstart');
		cy.get('[data-testid="constructor-filling-ul"]').trigger('drop');

		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('not.exist');
	});

	it('should not add bun when drops to burger filling placeholder', () => {
		cy.get('[data-testid="constructor-bun-top"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-bottom"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-top"]').contains('Выберите булку').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').contains('Выберите булку').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
		cy.get('[data-testid="constructor-filling-ul"]').trigger('drop');

		cy.get('[data-testid="constructor-bun-top"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-bottom"]').find('img').should('not.exist');
		cy.get('[data-testid="constructor-bun-top"]').contains('Выберите булку').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').contains('Выберите булку').should('exist');
	});

	it('should add all properly dropped same fillings', () => {
		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('exist');
		cy.get('[data-testid^="constructor-filling-item-"]').should('have.length', 1);

		const dropsCount = 5;

		for (let i = 0; i < dropsCount; i++) {
			cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093e"]').trigger('dragstart');
			cy.get('[data-testid="constructor-filling-ul"]').trigger('drop');
		}

		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('not.exist');
		cy.get('[data-testid^="constructor-filling-item-"]').should('have.length', dropsCount);
	});

	it('should add all properly dropped different fillings', () => {
		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('exist');
		cy.get('[data-testid^="constructor-filling-item-"]').should('have.length', 1);

		const fillings = [
			'643d69a5c3f7b9001cfa093e',
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa0943',
			'643d69a5c3f7b9001cfa0940',
		];

		for (let i = 0; i < fillings.length; i++) {
			cy.get(`[data-testid="ingredient-${fillings[i]}"]`).trigger('dragstart');
			cy.get('[data-testid="constructor-filling-ul"]').trigger('drop');
		}

		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('not.exist');
		cy.get('[data-testid^="constructor-filling-item-"]').should('have.length', fillings.length);
	});
});
