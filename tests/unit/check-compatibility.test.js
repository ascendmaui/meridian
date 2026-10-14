// Unit tests for compatibility audit script
const fs = require('fs');
const path = require('path');

// Mock the fs module
jest.mock('fs');
// Mock the path module
jest.mock('path');

describe('check-compatibility.js', () => {
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
    
    // Clear all mocks and reset module registry before each test
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterEach(() => {
    process.exit = originalExit;
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  describe('compatibility audit', () => {
    const mockIndexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Globe</title>
    <style>
        body { margin: 2rem; }
        .container { width: 80%; }
    </style>
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

    test('should pass with valid compatibility', () => {
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(0);
      expect(console.log).toHaveBeenCalledWith('Running compatibility audit...');
      expect(console.log).toHaveBeenCalledWith('✅ Found viewport meta tag: width=device-width, initial-scale=1.0');
      expect(console.log).toHaveBeenCalledWith('✅ No deprecated HTML tags found');
      expect(console.log).toHaveBeenCalledWith('✅ Found relative units in CSS');
      expect(console.log).toHaveBeenCalledWith('✅ Compatibility audit passed');
    });

    test('should fail when index.html cannot be read', () => {
      // Mock fs.readFileSync to throw an error
      fs.readFileSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });
      
      require('../../scripts/check-compatibility.js');
      expect(console.error).toHaveBeenCalledWith("Failed to read index.html:", "ENOENT: no such file or directory");
    });

    test('should fail when missing viewport meta tag', () => {
      const htmlWithoutViewport = `
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
      
      // Mock fs.readFileSync to return the HTML without viewport
      fs.readFileSync.mockReturnValue(htmlWithoutViewport);
      
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Missing viewport meta tag');
    });

    test('should fail when viewport missing width=device-width', () => {
      const htmlWrongViewport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container"></div>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with wrong viewport
      fs.readFileSync.mockReturnValue(htmlWrongViewport);
      
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Viewport missing width=device-width');
    });

    test('should fail when viewport missing initial-scale=1', () => {
      const htmlWrongViewport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container"></div>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with wrong viewport
      fs.readFileSync.mockReturnValue(htmlWrongViewport);
      
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Viewport missing initial-scale=1');
    });

    test('should fail when deprecated HTML tags found', () => {
      const htmlWithDeprecated = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container"></div>
    <center>Deprecated center tag</center>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with deprecated tag
      fs.readFileSync.mockReturnValue(htmlWithDeprecated);
      
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ Found deprecated tag: /<center[^>]*>/i');
    });

    test('should fail when no relative units found in CSS', () => {
      const htmlNoRelativeUnits = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Globe</title>
    <style>
        body { margin: 20px; padding: 10px; }
        .container { width: 960px; height: 500px; }
    </style>
</head>
<body>
    <div id="globe-container"></div>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML without relative units
      fs.readFileSync.mockReturnValue(htmlNoRelativeUnits);
      
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalledWith('❌ No relative units found in CSS (consider using vw, vh, %, em, rem for responsive design)');
    });

    test('should pass when relative units found in style attribute', () => {
      const htmlWithInlineStyle = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Globe</title>
</head>
<body>
    <div id="globe-container" style="width: 80%; height: 60vh;"></div>
    <script src="/src/index.js" type="module"></script>
</body>
</html>
`;
      
      // Mock fs.readFileSync to return the HTML with inline style
      fs.readFileSync.mockReturnValue(htmlWithInlineStyle);
      
      require('../../scripts/check-compatibility.js');
      expect(process.exit).toHaveBeenCalledWith(0);
      expect(console.log).toHaveBeenCalledWith('Running compatibility audit...');
      expect(console.log).toHaveBeenCalledWith('✅ Found viewport meta tag: width=device-width, initial-scale=1.0');
      expect(console.log).toHaveBeenCalledWith('✅ No deprecated HTML tags found');
      expect(console.log).toHaveBeenCalledWith('✅ Found relative units in CSS');
      expect(console.log).toHaveBeenCalledWith('✅ Compatibility audit passed');
    });
  });
});
