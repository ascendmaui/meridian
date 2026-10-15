# Meridian

Hosted interactive globe experience.

This repository is the durable source of truth for Meridian. Application source and deploy config will land here as the product is recovered and rebuilt.

## Status

Project is under development with source code, tests, and documentation.

## Audit Status

| Audit | Status | Score |
|-------|--------|-------|
| Performance | ✅ Passed | 100% |
| Accessibility | ✅ Passed | 100% |
| Security | ✅ Passed | 0 vulnerabilities |
*Last updated: 2026-10-15T03:07:13.3Z
| Content | ✅ Passed | Manual review passed |
| Compatibility | ✅ Passed | Manual review passed |
| Agentic Browsing | ✅ Passed | 100% |

## Running Audits Locally

You can run the audit scripts directly:

- Performance: `./run-audit-performance.sh`
- Accessibility: `./run-audit-accessibility.sh`
- Agentic Browsing: `./run-audit-agentic.sh`
- Security: `npm audit`
- Content: `npm run audit:content`
- Compatibility: `npm run audit:compatibility`

All scripts will start the server, run the audit, and then stop the server.

The CI workflow runs these checks on pull requests targeting `main` or `develop`.
