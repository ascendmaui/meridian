# Meridian

Hosted interactive globe experience.

This repository is the durable source of truth for Meridian. Application source and deploy config will land here as the product is recovered and rebuilt.

## Status

Project is under development with source code, tests, and documentation.

## Audit Status

| Audit | Status | Score |
|-------|--------|-------|
| Performance | ✅ Passed | 96% |
| Accessibility | ✅ Passed | 100% |
| Security | ✅ Passed | 0 vulnerabilities |
| Content | ✅ Passed | Manual review passed |
| Compatibility | ✅ Passed | Manual review passed |

*Last updated: 2026-10-07*

## Project Structure

```
src/          # globe client source code
index.html    # main HTML entry point
docs/         # product notes
tests/        # test suite (unit, integration, e2e)
```

## Testing

Meridian includes a comprehensive test suite:

- Unit tests (`tests/unit/`)
- Integration tests (`tests/integration/`)
- End-to-end tests (`tests/e2e/`) (requires a running server)

To run the tests:

```bash
# Install dependencies
npm install

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run end-to-end tests (first start a server on port 8080)
# npm run test:e2e

# Run all tests
npm test
```

See [docs/TESTING.md](docs/TESTING.md) for detailed instructions.

## Auditing

Meridian includes audit scripts for performance, accessibility, security, content, and compatibility.

To run the audits (requires a running server on port 8080):

```bash
# Performance audit
npm run audit:performance

# Accessibility audit
npm run audit:accessibility

# Security audit
npm run audit:security

# Content audit (manual step)
npm run audit:content

# Compatibility audit (manual step)
npm run audit:compatibility
```

See [docs/AUDIT.md](docs/AUDIT.md) for the audit plan and [AUDIT-RESULTS.md](AUDIT-RESULTS.md) for the latest results.

## Related

Owned by Ascend Maui (`ascendmaui/meridian`).

## Continuous Integration

This repository includes a GitHub Actions workflow that runs tests and audits on every push and pull request to the `main` and `develop` branches. The workflow:

1. Sets up Node.js
2. Installs dependencies
3. Starts a local server
4. Runs the full test suite (unit, integration, end-to-end)
5. Runs performance and accessibility audits using Lighthouse
6. Runs security audit via `npm audit`
7. Notes manual steps for content and compatibility audits

The workflow file is located at `.github/workflows/ci.yml`.
