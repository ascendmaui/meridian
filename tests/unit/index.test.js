const { initGlobe } = require('../../src/index');

describe('initGlobe', () => {
  beforeEach(() => {
    // Mock console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should log initialization message', () => {
    initGlobe();
    expect(console.log).toHaveBeenCalledWith('Meridian globe experience initialized');
  });

  test('should be a function', () => {
    expect(typeof initGlobe).toBe('function');
  });
});
