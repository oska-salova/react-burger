import { mockGetIngredients, getUserMock, mockAuth, mockRegisterOrder } from '../../mocks/mocks';

describe('register order', function () {
	beforeEach(() => {
		mockAuth();
		getUserMock();
		mockGetIngredients();
		cy.visit('/');
		cy.wait('@ingredients');
	});

	it('should add order create button when bun added', () => {
		cy.get('[data-testid="register-order-btn"]').should('not.exist');
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
		cy.get('[data-testid="constructor-bun-top"]').trigger('drop');
		cy.get('[data-testid="register-order-btn"]').should('exist');
	});

	it('should disable order create button while order register request is in progress', () => {
		mockRegisterOrder();

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
		cy.get('[data-testid="constructor-bun-top"]').trigger('drop');
		cy.get('[data-testid="register-order-btn"]').should('be.enabled');
		cy.get('[data-testid="register-order-btn"]').click();
		cy.wait('@user');
		cy.get('[data-testid="register-order-btn"]').should('be.disabled');
		cy.wait('@registerOrder');
		cy.get('[data-testid="register-order-btn"]').should('not.exist');
	});

	it('should open order details modal when order register request succeeded', () => {
		mockRegisterOrder();

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
		cy.get('[data-testid="constructor-bun-top"]').trigger('drop');
		cy.get('[data-testid="register-order-btn"]').click();
		cy.wait('@user');
		cy.get('[data-testid="order-details"]').should('not.exist');
		cy.wait('@registerOrder');
		cy.get('[data-testid="order-details"]').should('exist');
	});
});
