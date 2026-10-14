// Unit tests for content audit script
const fs = require('fs');
const path = require('path');

// Mock the fs module
jest.mock('fs');
// Mock the path module
jest.mock('path');

describe('check-content.js', () => {
  let originalExit;
  let originalConsoleError;
  let originalConsoleLog;

  beforeEach(() => {
    originalExit = process.exit;
    originalConsoleError = console.error;
    originalConsoleLog = console.log;
    
    process.exit = jest.fn();
    console.error = jest.fn();
    console.log = jest.fn();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.exit = originalExit;
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  describe('content audit', () => {
    const mockIndexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Meridian Globe Experience - Interactive 3D visualization">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container"></div>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;

    beforeEach(() => {
      // Mock fs.readFileSync to return our test HTML
      fs.readFileSync.mockReturnValue(mockIndexHtml);
      // Mock path.join to return the expected path
      path.join.mockReturnValue('/fake/path/index.html');
    });

    test('should pass with valid content', () => {
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(0);
      expect(console.log).toHaveBeenCalledWith('Running content audit...');
      expect(console.log).toHaveBeenCalledWith('✅ Found meta description tag');
      expect(console.log).toHaveBeenCalledWith('✅ Found lang attribute: en');
      expect(console.log).toHaveBeenCalledWith('✅ No obvious placeholder text found');
      expect(console.log).toHaveBeenCalledWith('ℹ️  No headings found to check structure');
      expect(console.log).toHaveBeenCalledWith('✅ Content audit passed');
    });

    test('should fail when index.html cannot be read', () => {
      // Mock fs.readFileSync to throw an error
      fs.readFileSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });
      
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('Failed to read index.html: ENOENT: no such file or directory');
    });

    test('should fail when missing meta description', () => {
      const htmlWithoutMeta = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container"></div>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML without meta description
      fs.readFileSync.mockReturnValue(htmlWithoutMeta);
      
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Missing meta description tag');
    });

    test('should fail when missing lang attribute', () => {
      const htmlWithoutLang = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Meridian Globe Experience - Interactive 3D visualization">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container"></div>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML without lang attribute
      fs.readFileSync.mockReturnValue(htmlWithoutLang);
      
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Missing lang attribute on html tag');
    });

    test('should fail when placeholder text found', () => {
      const htmlWithPlaceholder = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Meridian Globe Experience - Interactive 3D visualization">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container">Lorem Ipsum</div>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with placeholder
      fs.readFileSync.mockReturnValue(htmlWithPlaceholder);
      
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Found placeholder text: /Lorem Ipsum/i');
    });

    test('should pass with proper heading structure', () => {
      const htmlWithHeadings = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Meridian Globe Experience - Interactive 3D visualization">
    <title>Meridian Globe</title>
</head>
<body>
    <h1>Main Heading</h1>
    <h2>Sub Heading</h2>
    <h3>Sub Sub Heading</h3>
    <div id="globe-container"></div>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with proper headings
      fs.readFileSync.mockReturnValue(htmlWithHeadings);
      
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(0);
      expect(console.log).toHaveBeenCalledWith('Running content audit...');
      expect(console.log).toHaveBeenCalledWith('✅ Found meta description tag');
      expect(console.log).toHaveBeenCalledWith('✅ Found lang attribute: en');
      expect(console.log).toHaveBeenCalledWith('✅ No obvious placeholder text found');
      expect(console.log).toHaveBeenCalledWith('✅ Heading structure is properly sequential');
      expect(console.log).toHaveBeenCalledWith('✅ Content audit passed');
    });

    test('should fail when heading structure is incorrect', () => {
      const htmlWithBadHeadings = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Meridian Globe Experience - Interactive 3D visualization">
    <title>Meridian Globe</title>
</head>
<body>
    <h1>Main Heading</h1>
    <h3>Sub Sub Heading (skipping h2)</h3>
    <div id="globe-container"></div>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with bad headings
      fs.readFileSync.mockReturnValue(htmlWithBadHeadings);
      
      require('../../scripts/check-content.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Heading structure is not sequential (e.g., h1 followed by h3)');
    });
  });
});
