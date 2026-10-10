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

