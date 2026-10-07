# Contributing to Meridian

Thank you for considering contributing to Meridian! This document outlines our contribution process.

## Code of Conduct

Please note that this project is released with a Contributor Covenant Code of Conduct. By participating in this project you agree to abide by its terms.

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please check if it has already been reported by searching the [Issues](../../issues).

If you're unable to find an open issue addressing the problem, [open a new issue](https://github.com/ascendmaui/meridian/issues/new). Be sure to include:

- A clear and descriptive title
- A detailed description of the problem
- Steps to reproduce the issue
- Any relevant screenshots or console errors
- Your environment (browser version, OS, etc.)

### Suggesting Features

Feature requests are welcome! Please open an issue with:

- A clear and descriptive title
- A detailed description of the desired feature
- Any relevant use cases or examples
- Why this feature would be valuable to the project

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes (`npm test`)
4. Make sure your code lints (`npm run lint`)
5. Issue your pull request!

#### Pull Request Guidelines

- Keep changes focused and scoped to a single issue
- Write clear, descriptive commit messages
- Follow the existing code style
- Update documentation as needed
- Add tests for new functionality
- Ensure all tests pass before submitting

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Clone your fork
git clone https://github.com/your-username/meridian.git

# Navigate to the project directory
cd meridian

# Install dependencies
npm install
```

### Running Tests

See the [README.md](./README.md) for detailed instructions on running tests and audits.

## Style Guidelines

### JavaScript

- Use ES6+ features
- Prefer `const` and `let` over `var`
- Use arrow functions for concise callbacks
- Add JSDoc comments for functions and classes
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) (with local overrides in .eslintrc.js)

### HTML

- Use semantic HTML5 elements
- Ensure all images have alt attributes
- Use proper heading hierarchy (h1-h6)
- Validate HTML with W3C validator

### CSS

- Use BEM naming convention for components
- Prefer CSS custom properties (variables) for theming
- Use Flexbox and Grid for layout
- Ensure mobile-first responsive design

## Commit Message Format

We follow conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## License

By contributing, you agree that your contributions will be licensed under the MIT License.


## Continuous Integration

This project uses GitHub Actions to run tests and audits on every push and pull request. The CI workflow includes:

- Installing dependencies
- Starting a local server
- Running the test suite (unit, integration, end-to-end)
- Running performance and accessibility audits with Lighthouse
- Running security audit with `npm audit`
- Manual checks for content and compatibility

You can view the workflow at `.github/workflows/ci.yml`.

## Running Audits Locally

To run the audits locally, first start a server on port 8080:

```bash
# Option 1: Node.js server
node server.js

# Option 2: Python server
python3 -m http.server 8080

# Option 3: Any static file server
```

Then run the audit scripts:

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

See the [Audit Plan](docs/AUDIT.md) for more details.

