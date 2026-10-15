// Set up THREE global for jsdom testing
// We'll mock it in individual tests, but ensure it's defined to prevent early return
if (typeof global.THREE === 'undefined') {
  global.THREE = {};
}
