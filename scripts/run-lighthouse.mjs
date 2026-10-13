import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromeFlagsCliArg } = require('./chrome-launch-flags.js');

const lighthouseCli = require.resolve('lighthouse/cli/index.js');
const child = spawn(
  process.execPath,
  [lighthouseCli, chromeFlagsCliArg(), ...process.argv.slice(2)],
  { stdio: 'inherit' },
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code === null ? 1 : code);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
