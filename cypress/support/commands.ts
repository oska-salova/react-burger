/// <reference types="cypress" />

export {};

Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, targetElSelector) => {
	cy.wrap(subject).trigger('dragstart');
	cy.get(targetElSelector).trigger('drop');
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			dragTo(targetElSelector: string): void;
		}
	}
}
