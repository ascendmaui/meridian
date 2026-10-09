const globals = require('globals');

module.exports = [
  {
    ignores: [
      '**/*.md',
      '**/*.bak'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        THREE: true
      }
    },
    plugins: {},
    rules: {}
  }
];
