// Integration tests for Meridian globe experience
// Simple tests that don't require jsdom

const fs = require('fs');
const path = require('path');

describe('HTML File Contents', () => {
  let htmlContent;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });

  test('should contain globe container with aria-label', () => {
    expect(htmlContent).toMatch(/id="globe-container"/);
    expect(htmlContent).toMatch(/aria-label="3D globe visualization"/);
  });

  test('should contain skip link for keyboard navigation', () => {
    expect(htmlContent).toMatch(/class="skip-link"/);
    expect(htmlContent).toMatch(/href="#globe-container"/);
  });

  test('should have main element', () => {
    expect(htmlContent).toMatch(/<main>/);
    expect(htmlContent).toMatch(/<\/main>/);
  });

  test('should load the globe initialization script as module', () => {
    expect(htmlContent).toMatch(/src="\/src\/index\.js"/);
    expect(htmlContent).toMatch(/type="module"/);
  });

  test('should have lang attribute on html element', () => {
    expect(htmlContent).toMatch(/<html lang="en">/);
  });

  // Content audit: check for placeholder text
  test('should not contain Lorem Ipsum placeholder text', () => {
    expect(htmlContent).not.toMatch(/Lorem Ipsum/i);
    expect(htmlContent).not.toMatch(/lorem ipsum/i);
  });

  // Compatibility audit: check for viewport meta tag
  test('should have viewport meta tag for mobile responsiveness', () => {
    expect(htmlContent).toMatch(/<meta name="viewport" content="width=device-width, initial-scale=1.0">/);
  });

  // Content audit: check for meta description
  test('should have a meta description tag', () => {
    expect(htmlContent).toMatch(/<meta name="description" content="Meridian Globe Experience - Interactive 3D visualization">/);
  });

  // Performance audit: check for external stylesheets (none should be present for inline styles)
  test('should not have external stylesheets (performance)', () => {
    expect(htmlContent).not.toMatch(/<link rel="stylesheet"/);
  });

  // Accessibility audit: check for skip link visibility on focus
  // Note: This is a CSS check, but we can at least check the skip link exists and has the correct class
  test('should have a skip link with the correct class', () => {
    expect(htmlContent).toMatch(/class="skip-link"/);
  });

  // Security audit: check for inline scripts (we have none, but we can check for event handlers in HTML)
  test('should not have inline event handlers in HTML (basic security check)', () => {
    expect(htmlContent).not.toMatch(/onload\s*=/i);
    expect(htmlContent).not.toMatch(/onerror\s*=/i);
    expect(htmlContent).not.toMatch(/onclick\s*=/i);
  });

});
