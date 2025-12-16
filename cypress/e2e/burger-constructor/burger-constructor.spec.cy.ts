describe('burger constructor', function () {
	beforeEach(() => {
		cy.visit('/');
		cy.intercept('GET', '*/ingredients', {
			fixture: 'ingredients.json',
		}).as('ingredients');
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
});
