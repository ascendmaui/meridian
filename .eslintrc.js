module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    THREE: true, // Three.js library loaded via CDN
  },
  overrides: [
    {
      files: ['tests/e2e/**/*.cy.js'],
      env: {
        mocha: true,
      },
      globals: {
        cy: true,
      },
    },
    {
      files: ['tests/**/*.js', '!tests/e2e/**/*.cy.js'],
      env: {
        jest: true,
      },
    },
  ],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // You can customize rules here
  },
};
