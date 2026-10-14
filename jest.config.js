export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  transformIgnorePatterns: ['/node_modules/'], // Transform all files (excluding node_modules)
};
