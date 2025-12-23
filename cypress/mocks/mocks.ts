export const mockGetIngredients = () => {
	cy.intercept('GET', '**/api/ingredients', {
		fixture: 'ingredients.json',
	}).as('ingredients');
};

export const mockRegisterOrder = () => {
	cy.intercept('POST', '**/api/orders', req => {
		req.reply({
			statusCode: 200,
			fixture: 'register-order.json',
			delay: 1000,
		});
	}).as('registerOrder');
};

export const getUserMock = () => {
	cy.intercept('GET', '**/api/auth/user', {
		fixture: 'user.json',
	}).as('user');
};

export const mockAuth = () => {
	localStorage.setItem('accessToken', 'test token');
};
