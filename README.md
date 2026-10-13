# Meridian

Hosted interactive globe experience.

This repository is the durable source of truth for Meridian. Application source and deploy config will land here as the product is recovered and rebuilt.

## Features

- Interactive 3D globe visualization using Three.js
- Responsive design for mobile and desktop
- Accessibility features (skip link, ARIA labels, keyboard navigation)
- Performance optimized (gzip compression, caching)
- Security headers (CSP, X-Frame-Options, etc.)
- AI resource discovery support (ai-catalog.json, ARD schema)
- Comprehensive test suite (unit, integration, end-to-end)
- Automated audits (performance, accessibility, agentic browsing, security, content, compatibility)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meridian.git

# Navigate to the project directory
cd meridian

# Install dependencies
npm install
```

## Development Server

To start the development server:

```bash
npm start
```

Or directly:

```bash
node server.js
```

The server will be available at `http://localhost:8080`.

## Testing

Meridian uses Jest for unit and integration tests, and Cypress for end-to-end testing.

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run end-to-end tests (requires server running on port 8080)
npm run test:e2e
```

## Auditing

Meridian includes Lighthouse-based audits for performance, accessibility, security, content, and compatibility.

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

## Project Structure

```
meridian/
├── docs/                 # Documentation files
│   └── AI-CATALOG.md       # AI catalog format and agent discovery
├── src/                  # Source code (client-side)
│   └── index.js          # Globe initialization and rendering
├── tests/                # Test suite
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests (Cypress)
├── server.js             # HTTP server with compression and security headers
├── index.html            # Main HTML page
├── 404.html              # Custom 404 page
├── ai-catalog.json       # AI Resource Catalog
├── .well-known/          # Well-known resources (e.g., ai-catalog.json)
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*Last audit status updated: 2026-10-13T14:49:51.0NZ
