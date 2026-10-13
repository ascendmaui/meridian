const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  CHROME_LAUNCH_FLAGS,
  chromeFlagsCliArg,
} = require('../../scripts/chrome-launch-flags');

const root = path.resolve(__dirname, '../..');

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

describe('CI workflow', () => {
  const workflow = readProjectFile('.github/workflows/ci.yml');

  test('passes the matrix Node version into setup-node', () => {
    expect(workflow).toContain('node-version: ${{ matrix.node-version }}');
    expect(workflow).not.toMatch(/\$\{\{\s*node-version\s*\}\}/);
  });

  test('still runs the unit, audit, and end-to-end steps', () => {
    expect(workflow).toContain('npm test');
    expect(workflow).toContain('./run-audit-performance.sh');
    expect(workflow).toContain('./run-audit-accessibility.sh');
    expect(workflow).toContain('./run-audit-agentic.sh');
    expect(workflow).toContain('npm run test:e2e');
  });
});

describe('Lighthouse Chrome launch flags', () => {
  test('includes the flags required to start Chrome without a display', () => {
    expect(CHROME_LAUNCH_FLAGS).toEqual(expect.arrayContaining([
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ]));
    expect(chromeFlagsCliArg()).toBe(
      `--chrome-flags=${CHROME_LAUNCH_FLAGS.join(' ')}`,
    );
  });

  test('audit commands launch Lighthouse through the headless wrapper', () => {
    const pkg = JSON.parse(readProjectFile('package.json'));
    for (const scriptName of ['audit:performance', 'audit:accessibility', 'audit:agentic']) {
      expect(pkg.scripts[scriptName]).toContain('scripts/run-lighthouse.mjs');
    }
    expect(readProjectFile('scripts/run-lighthouse.mjs')).toContain('chromeFlagsCliArg()');
    expect(readProjectFile('run-audit-agentic.sh')).toContain('npm run audit:agentic');
  });
});

describe('performance audit script', () => {
  test('prints a failing Lighthouse run instead of aborting under set -e', () => {
    const binDir = fs.mkdtempSync(path.join(os.tmpdir(), 'meridian-fake-npm-'));
    const npmPath = path.join(binDir, 'npm');
    fs.writeFileSync(
      npmPath,
      [
        '#!/bin/bash',
        'if [ "$1" = "run" ] && [ "$2" = "audit:performance" ]; then',
        '  echo "Missing X server or $DISPLAY"',
        '  exit 7',
        'fi',
        'echo "unexpected npm invocation: $*" >&2',
        'exit 1',
        '',
      ].join('\n'),
      { mode: 0o755 },
    );

    const result = spawnSync('bash', ['./run-audit-performance.sh'], {
      cwd: root,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH}`,
      },
      encoding: 'utf8',
      timeout: 20000,
    });

    expect(result.status).toBe(7);
    expect(result.stdout).toContain('Missing X server or');
    expect(result.stdout).toContain('Performance audit failed');
  }, 20000);
});
