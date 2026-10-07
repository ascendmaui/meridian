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

### Running Unit Tests

```bash
npm run test:unit
```

### Running Integration Tests

```bash
npm run test:integration
```

### Running End-to-End Tests

E2e tests require a running instance of the application. Before running E2e tests:

1. Start the server: `node server.js`
2. In another terminal, run the tests: `npm run test:e2e`

### Prerequisites for E2E Tests
  
  E2e tests require a running instance of the application. Before running E2e tests:
  
  1. Ensure the server is running on port 8080
  2. Ensure the server is accessible at http://localhost:8080/
  
  Then run the tests:
  
  ```bash
  npm run test:e2e
  ```
  
  Alternatively, you can use the provided script:
  
  ```bash
  ./run-e2e.sh
  ```
```

## Running Audits

Meridian includes Lighthouse-based audits for performance, accessibility, security, content, and compatibility.

```bash
# Run performance audit
npm run audit:performance

# Run agentic browsing audit
# Note: Agentic browsing audit requires special Lighthouse configuration.
# See lighthouse-agentic-fixed2.json for reference results.

# Run accessibility audit
npm run audit:accessibility

# Run security audit (npm audit)
npm run audit:security

# Run content audit (manual step)
npm run audit:content

# Run compatibility audit (manual step)
npm run audit:compatibility

# Run all audits (except content and compatibility which are manual)
./run-audits-tests.sh
```

See [docs/AUDIT.md](docs/AUDIT.md) for the audit plan and [AUDIT-RESULTS.md](AUDIT-RESULTS.md) for the latest results.

## Lighthouse Audit Scripts

The audit scripts automatically start the server before running Lighthouse to prevent interstitial errors:

- `run-audit-performance.sh` - Starts server, runs performance audit, stops server
- `run-audit-accessibility.sh` - Starts server, runs accessibility audit, stops server
