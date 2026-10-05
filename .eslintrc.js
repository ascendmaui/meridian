module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    THREE: true, // Three.js library loaded via CDN
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // You can customize rules here
  },
};
