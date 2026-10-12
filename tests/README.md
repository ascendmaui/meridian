# Meridian Tests

This directory contains tests for the Meridian globe experience.

## Test Structure

- `unit/` - Unit tests using Jest and JSDOM
- `integration/` - Integration tests using Node.js assert
- `e2e/` - End-to-end tests using Cypress

## Running Tests

### Install Dependencies

First, ensure you have Node.js installed and then install project dependencies:

```bash
npm install
```

### Running Unit Tests

```bash
npm run test:unit
```

### Running Integration Tests

```bash
npm run test:integration
```

### Running End-to-End Tests

End-to-end tests require a running instance of the application. You can use the provided script:

```bash
./run-e2e.sh
```

Alternatively, you can start the server manually and then run the tests:

1. Start the server: `node server.js`
2. In another terminal, run the tests: `npm run test:e2e`

### Running All Tests

```bash
npm test
```

## Test Coverage

The test suite covers:

- Globe initialization and rendering logic
- HTML content validation
- Server header and security checks
- End-to-end user interactions
- Error handling and edge cases

## Writing Tests

When adding new features, please add corresponding tests:

- For utility functions and classes: add unit tests in `tests/unit/`
- For integration points and API contracts: add integration tests in `tests/integration/`
- For user workflows and UI interactions: add end-to-end tests in `tests/e2e/`

All new tests should follow the existing code style and patterns.
