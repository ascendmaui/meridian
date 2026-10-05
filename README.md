# Meridian

Hosted interactive globe experience.

This repository is the durable source of truth for Meridian. Application source and deploy config will land here as the product is recovered and rebuilt.

## Status

Scaffold / SoT repo. Content beyond this README has not been checked in yet.

## Planned layout

```
src/          # globe client
public/       # static assets
docs/         # product notes
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

