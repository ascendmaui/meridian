// Integration tests for Meridian globe experience
// Tests that require parsing the HTML file

const fs = require('fs');
const path = require('path');

describe('HTML File Contents', () => {
  let htmlContent;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });

  test('index.html contains skip link and globe container and module script', () => {
    // Check for skip link
    expect(htmlContent).toMatch(/<a href="#globe-container" class="skip-link">Skip to globe visualization<\/a>/);
    // Check for globe container opening tag with correct attributes
    expect(htmlContent).toMatch(/<div id="globe-container" role="img" aria-label="3D globe visualization">/);
    // Check for module script
    expect(htmlContent).toMatch(/<script type="module" src="\/src\/index.js"><\/script>/);
  });

  test('should have a title tag with correct text', () => {
    expect(htmlContent).toMatch(/<title>Meridian Globe<\/title>/);
  });

  test('should not contain Lorem Ipsum placeholder text', () => {
    expect(htmlContent).not.toMatch(/Lorem Ipsum/i);
    expect(htmlContent).not.toMatch(/lorem ipsum/i);
  });

  test('should not contain todo or FIXME placeholders', () => {
    expect(htmlContent).not.toMatch(/todo/i);
    expect(htmlContent).not.toMatch(/fixme/i);
  });

  test('should have a favicon link', () => {
    expect(htmlContent).toMatch(/<link rel="icon"/);
  });

  test('should have a globe placeholder element with loading text', () => {
    expect(htmlContent).toMatch(/id="globe-placeholder"/);
    expect(htmlContent).toMatch(/Loading globe visualization.../);
  });

});
