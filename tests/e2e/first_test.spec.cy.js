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
  it('should have a canvas element for globe rendering', () => {
    cy.get('#globe-container')
      .find('canvas')
      .should('exist')
      .and('be.visible');
  });

  it('should have a canvas with reasonable dimensions', () => {
    cy.get('#globe-container')
      .find('canvas')
      .then($canvas => {
        // Check that the canvas has width and height attributes set
        expect($canvas.attr('width')).to.be.a('string').that.is.not.empty;
        expect($canvas.attr('height')).to.be.a('string').that.is.not.empty;
        // Or check that the computed style has non-zero dimensions
        const width = $canvas.width();
        const height = $canvas.height();
        expect(width).to.be.greaterThan(0);
        expect(height).to.be.greaterThan(0);
      });
  });

  // Note: Additional tests for actual globe functionality would go here
  // once the globe implementation is added
});
