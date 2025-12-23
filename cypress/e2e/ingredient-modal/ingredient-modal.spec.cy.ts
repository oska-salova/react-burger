import { mockGetIngredients } from '../../mocks/mocks';

describe('ingredient modal', function () {
	beforeEach(() => {
		mockGetIngredients();
		cy.visit('/');
		cy.wait('@ingredients');
	});

	it('should open modal with ingredient details by click on ingredient', () => {
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
		cy.get('[data-testid="modal"]').should('exist');
		cy.get('[data-testid="ingredient-details"]').should('exist');
		cy.get('[data-testid="ingredient-details"]')
			.contains('Краторная булка N-200i')
			.should('exist');

		cy.get('[data-testid="ingredient-details"]').contains('420').should('exist');
	});

	it('should close ingredient modal by click on close button', () => {
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
		cy.get('[data-testid="modal"]').should('exist');
		cy.get('[data-testid="ingredient-details"]').should('exist');
		cy.get('[data-testid="modal-close-btn"]').click();
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
	});

	it('should close ingredient modal by click on modal overlay', () => {
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
		cy.get('[data-testid="modal"]').should('exist');
		cy.get('[data-testid="ingredient-details"]').should('exist');
		cy.get('[data-testid="modal-overlay"]').click({ force: true });
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
	});

	it('should close ingredient modal by click ESC', () => {
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
		cy.get('[data-testid="modal"]').should('exist');
		cy.get('[data-testid="ingredient-details"]').should('exist');
		cy.get('body').type('{esc}').click();
		cy.get('[data-testid="modal"]').should('not.exist');
		cy.get('[data-testid="ingredient-details"]').should('not.exist');
	});
});
