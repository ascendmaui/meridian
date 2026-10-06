// Integration tests for HTML structure
const fs = require('fs');
const path = require('path');

describe('Integration tests', () => {
  test('index.html contains skip link and globe container', () => {
    const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Check for skip link
    expect(html).toMatch(/<a href="#globe-container" class="skip-link">Skip to globe visualization<\/a>/);
    // Check for globe container
    expect(html).toMatch(/<div id="globe-container" role="img" aria-label="3D globe visualization"><\/div>/);
    // Check for module script
    expect(html).toMatch(/<script type="module" src="\/src\/index.js"><\/script>/);
  });
});
