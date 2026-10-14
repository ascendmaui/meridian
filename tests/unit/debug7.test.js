// Debug test to see what fs.readFileSync returns
const fs = require('fs');
const path = require('path');

// Mock the fs module
jest.mock('fs');
// Mock the path module
jest.mock('path');

describe('debug7', () => {
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

  test('should see what fs.readFileSync returns', () => {
    // Mock fs.readFileSync to return a string
    fs.readFileSync.mockImplementation((filePath, encoding) => {
      console.log('fs.readFileSync called with:', filePath, encoding);
      return '<html><head><meta name="description" content="test"></head></html>';
    });
    // Mock path.join to return the expected path
    path.join.mockReturnValue('/fake/path/index.html');
    
    // Require the script - this should call our mocked fs
    require('../../scripts/check-content.js');
    
    // Verify our mock was called correctly
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(fs.readFileSync).toHaveBeenCalledWith('/fake/path/index.html', 'utf8');
  });
});

