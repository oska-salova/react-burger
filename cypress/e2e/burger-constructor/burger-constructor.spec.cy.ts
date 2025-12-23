import { mockGetIngredients } from '../../mocks/mocks';

describe('burger constructor', function () {
	const testSingleBunId = '643d69a5c3f7b9001cfa093c';
	const testSingleBunName = 'Краторная булка N-200i';

	beforeEach(() => {
		cy.visit('/');
		mockGetIngredients();
		cy.wait('@ingredients');
		cy.get('[data-testid="constructor-bun-top"]').as('constructorTopBun');
		cy.get('[data-testid="constructor-bun-bottom"]').as('constructorBottomBun');
	});

	it('should add 2 buns to burger when bun drops to burger bun placeholder', () => {
		cy.get('@constructorTopBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorBottomBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorTopBun').contains('Выберите булку').should('exist');
		cy.get('@constructorBottomBun').contains('Выберите булку').should('exist');

		cy.get(`[data-testid="ingredient-${testSingleBunId}"]`).dragTo('@constructorTopBun');

		cy.get('@constructorTopBun').contains('span', testSingleBunName).should('exist');
		cy.get('@constructorBottomBun').contains('span', testSingleBunName).should('exist');
		cy.get('@constructorTopBun').contains('Выберите булку').should('not.exist');
		cy.get('@constructorBottomBun').contains('Выберите булку').should('not.exist');
	});

	it('should not add fillings when drops to burger bun placeholder', () => {
		cy.get('@constructorTopBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorBottomBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorTopBun').contains('Выберите булку').should('exist');
		cy.get('@constructorBottomBun').contains('Выберите булку').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093e"]').dragTo('@constructorTopBun');

		cy.get('@constructorTopBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorBottomBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorTopBun').contains('Выберите булку').should('exist');
		cy.get('@constructorBottomBun').contains('Выберите булку').should('exist');
	});

	it('should add filling when drops to burger filling placeholder', () => {
		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093e"]').dragTo(
			'[data-testid="constructor-filling-ul"]',
		);

		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('not.exist');
	});

	it('should not add bun when drops to burger filling placeholder', () => {
		cy.get('@constructorTopBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorBottomBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorTopBun').contains('Выберите булку').should('exist');
		cy.get('@constructorBottomBun').contains('Выберите булку').should('exist');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').dragTo(
			'[data-testid="constructor-filling-ul"]',
		);

		cy.get('@constructorTopBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorBottomBun').contains('span', testSingleBunName).should('not.exist');
		cy.get('@constructorTopBun').contains('Выберите булку').should('exist');
		cy.get('@constructorBottomBun').contains('Выберите булку').should('exist');
	});

	it('should add all properly dropped same fillings', () => {
		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('exist');
		cy.get('[data-testid^="constructor-filling-item-"]').should('have.length', 1);

		const dropsCount = 5;

		for (let i = 0; i < dropsCount; i++) {
			cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093e"]').dragTo(
				'[data-testid="constructor-filling-ul"]',
			);
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
			cy.get(`[data-testid="ingredient-${fillings[i]}"]`).dragTo(
				'[data-testid="constructor-filling-ul"]',
			);
		}

		cy.get('[data-testid="constructor-filling-item-empty-filling"]').should('not.exist');
		cy.get('[data-testid^="constructor-filling-item-"]').should('have.length', fillings.length);
	});
});
