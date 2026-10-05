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
});

