# Testing Guide for Meridian

This document explains how to run the various tests for the Meridian globe experience.

## Test Suite Overview

Meridian uses Jest for unit and integration tests, and Cypress for end-to-end testing.

```
tests/
├── unit/          # Unit tests
├── integration/   # Integration tests
└── e2e/           # End-to-end tests (Cypress)
```

## Running Tests

### Install Dependencies

First, ensure you have Node.js installed and then install project dependencies:

```bash
npm install
```

### Unit Tests

Unit tests focus on individual functions and modules in isolation.

```bash
# Run all unit tests
npm run test:unit

# Or using jest directly
npx jest --testPathPatterns=unit/
```

### Integration Tests

Integration tests verify that different parts of the system work together correctly, including content, performance, accessibility, and security checks.

```bash
# Run all integration tests
npm run test:integration

# Or using jest directly
npx jest --testPathPatterns=integration/
```

### End-to-End Tests

End-to-end tests simulate real user interactions with the application in a browser.

```bash
# Run all Cypress tests
npm run test:e2e

# Or using cypress directly
npx cypress run
```

#### Prerequisites for E2E Tests

E2e tests require a running instance of the application. Before running E2e tests:

1. Start a local development server:
   ```bash
   # Option 1: Using Python
   python3 -m http.server 8080

   # Option 2: Using Node.js serve (if installed)
   npx serve -l 8080

   # Option 3: Using the provided server
   node server.js

   # Option 4: Using any static file server
   ```

2. Then run the E2e tests:
   ```bash
   npm run test:e2e
   ```

### Running All Tests

To run the complete test suite:

```bash
npm test
```

This will run unit, integration, and (if a server is detected) end-to-end tests.

## Running Audits

Meridian includes Lighthouse-based audits for performance, accessibility, security, content, and compatibility.

**Note:** For performance and accessibility audits, it is recommended to use the provided shell scripts that automatically start and stop the server to prevent interstitial errors. For security, content, and compatibility audits, the npm scripts can be used as shown.

```bash
# Run performance audit (recommended: uses script that starts/stops server)
./run-audit-performance.sh

# Run accessibility audit (recommended: uses script that starts/stops server)
./run-audit-accessibility.sh

# Run agentic browsing audit (recommended: uses script that starts/stops server)
./run-audit-agentic.sh

# Run security audit (npm audit)
npm run audit:security

# Run content audit (automated via npm run audit:content)
npm run audit:content

# Run compatibility audit (automated via npm run audit:compatibility)
npm run audit:compatibility

# Run all audits (except content and compatibility which are manual)
./run-audits-tests.sh
```

See [docs/AUDIT.md](docs/AUDIT.md) for the audit plan and [AUDIT-RESULTS.md](AUDIT-RESULTS.md) for the latest results.

## Lighthouse Audit Scripts

The audit scripts automatically start the server before running Lighthouse to prevent interstitial errors:

- `run-audit-performance.sh` - Starts server, runs performance audit, stops server
- `run-audit-accessibility.sh` - Starts server, runs accessibility audit, stops server
- `run-audit-agentic.sh` - Starts server, runs agentic browsing audit, stops server

## Test File Conventions

### Unit Tests

- Located in `tests/unit/`
- File naming: `[module-name].test.js`
- Example: `tests/unit/index.test.js`

### Integration Tests

- Located in `tests/integration/`
- File naming: `[feature-name]-integration.test.js` or similar
- Example: `tests/integration/globe-integration.test.js`

### E2E Tests

- Located in `tests/e2e/`
- File naming: `[description].spec.cy.js` (Cypress convention)
- Example: `tests/e2e/first_test.spec.cy.js`

## Writing Tests

### Unit Testing Tips

- Mock external dependencies
- Test edge cases and error conditions
- Keep tests focused on a single unit of behavior
- Use descriptive test names that explain what is being tested

### Integration Testing Tips

- Test interactions between multiple modules
- Test DOM interactions and event handling
- Test data flow through the system
- Use realistic test data
- Include content checks (e.g., no placeholder text, meta description present)
- Include performance checks (e.g., no external stylesheets)
- Include accessibility checks (e.g., skip link present, proper ARIA labels)
- Include security checks (e.g., no inline event handlers)
- Use the existing test suite as a guide for adding new tests

### E2E Testing Tips

- Use data attributes (`data-cy` or `data-test`) for reliable selectors
- Test user workflows from start to finish
- Test error states and edge cases
- Clean up state between tests when necessary

## Continuous Integration

In a CI environment, the test suite is typically run as follows:

1. Install dependencies
2. Start the application server (in background)
3. Run unit and integration tests
4. Run end-to-end tests against the running server
5. Stop the server

## Troubleshooting

### "Cannot find module" errors

Ensure you have installed all dependencies:
```bash
npm install
```

### Port already in use when starting server

Choose a different port or kill the process using the port:
```bash
# Find process using port 8080
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
```

### Tests failing due to timing issues

- Use Jest's fake timers for time-dependent code
- In Cypress, use appropriate waiting commands (`cy.wait()`, interception, etc.)
- Ensure async operations are properly awaited in tests

## Related Documentation

- [Audit Plan](AUDIT.md) - Information about performance, accessibility, security, content, and compatibility audits
- [Audit Results](AUDIT-RESULTS.md) - Latest audit scores and improvement history
- [Contributing Guidelines](CONTRIBUTING.md) - Detailed contribution process

## Recent Improvements (as of 2026-10-14T22:10:00.0Z)

- All tests pass (unit, integration, end-to-end) - 64/64
- Linting passes with no warnings (ESLint v10.x flat config)
- Performance audit score: 100% (excellent performance)
- Accessibility audit score: 100%
- Content audit: Pass
- Compatibility audit: Pass
- Agentic browsing audit: 100%
- Security audit (npm audit): 0 vulnerabilities found
- Updated audit documentation (AUDIT-RESULTS.md, AUDIT-SUMMARY.md) with latest results
- Updated WORK_SUMMARY.md with latest audit run details
- Updated AUDIT.md and TESTING.md with latest audit and test information

## Continuous Integration

The CI workflow runs on GitHub Actions for pushes and pull requests to the `main` and `develop` branches. The workflow executes the following steps:

1. Install dependencies
2. Run unit and integration tests (Jest)
3. Run performance, accessibility, agentic browsing, security, content, and compatibility audits
4. Start a server for end-to-end tests
5. Run end-to-end tests (Cypress)
6. Stop the server

The audit scripts (`run-audit-performance.sh`, `run-audit-accessibility.sh`, `run-audit-agentic.sh`) automatically start and stop the server for their respective audits, so no manual server management is required for those steps.

To view the CI workflow definition, see [.github/workflows/ci.yml](.github/workflows/ci.yml).
