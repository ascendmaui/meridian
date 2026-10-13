/**
 * Chrome flags for Lighthouse on machines with no X display.
 *
 * chrome-launcher only adds `--headless` when the HEADLESS environment
 * variable is set. A default `lighthouse` invocation on GitHub-hosted
 * runners therefore starts headed Chrome, which exits immediately with
 * "Missing X server or $DISPLAY".
 */
const CHROME_LAUNCH_FLAGS = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
];

/**
 * One argv entry for the Lighthouse CLI. Passed as a single argument so
 * spaces inside the flag list are not split by the shell.
 * @returns {string}
 */
function chromeFlagsCliArg() {
  return `--chrome-flags=${CHROME_LAUNCH_FLAGS.join(' ')}`;
}

module.exports = {
  CHROME_LAUNCH_FLAGS,
  chromeFlagsCliArg,
};
