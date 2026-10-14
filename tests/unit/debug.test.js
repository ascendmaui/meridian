// Debug test to see if requirement works
const fs = require('fs');
const path = require('path');

// Mock the fs module
jest.mock('fs');
// Mock the path module
jest.mock('path');

describe('debug', () => {
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

  test('should require the script', () => {
    fs.readFileSync.mockReturnValue('<html></html>');
    path.join.mockReturnValue('/fake/path/index.html');
    
    // This should execute the script
    const script = require('../../scripts/check-content.js');
    console.log('Script required:', !!script);
  });
});

