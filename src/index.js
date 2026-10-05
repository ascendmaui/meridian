// Meridian Globe Experience
// Entry point for the interactive globe application

/**
 * Initialize the globe experience
 * @returns {void}
 */
function initGlobe() {
  console.log('Meridian globe experience initialized');
  // TODO: Implement actual globe rendering (e.g., using Three.js or Cesium)
}

// If running in browser, initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', initGlobe);
}

// Export for use in other environments (e.g., Node.js for SSR)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initGlobe };
}
