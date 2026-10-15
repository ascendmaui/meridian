/// <reference types="cypress" />

describe('Meridian Globe Experience', () => {
  beforeEach(() => {
    // Visit the application
    // Note: We need to serve the application first for this to work
    // For now, we'll test against localhost:8080 assuming a server is running
    // In a real CI setup, we would start a server as part of the test
    cy.visit('http://localhost:8080');
  });

  it('should load successfully', () => {
    // Check that the page loads and contains expected elements
    cy.title().should('eq', 'Meridian Globe');
    cy.get('html').should('have.attr', 'lang', 'en');
  });

  it('should have a globe container with aria-label', () => {
    cy.get('#globe-container')
      .should('exist')
      .and('have.attr', 'aria-label', '3D globe visualization');
  });

  it('should have a skip link for keyboard navigation', () => {
    cy.get('.skip-link')
      .should('exist')
      .and('have.attr', 'href', '#globe-container');
  });

  it('should have a main element', () => {
    cy.get('main').should('exist');
  });

  // Note: Additional tests for actual globe functionality would go here
  // once the globe implementation is added
});
