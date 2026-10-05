// Meridian Globe Experience
// Entry point for the interactive globe application

/**
 * Initialize the globe experience
 * @returns {void}
 */
function initGlobe() {
  console.log('Meridian globe experience initialized');

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('Three.js failed to load');
    return;
  }

  // Get the container element
  const container = document.getElementById('globe-container');
  if (!container) {
    console.error('Globe container not found');
    return;
  }

  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue

  // Create a camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create a sphere (globe)
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x2233ff,
    metalness: 0.2,
    roughness: 0.8,
  });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Add a light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the globe
    globe.rotation.y += 0.005;

    renderer.render(scene, camera);
  }

  // Handle window resize
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', onWindowResize);

  // Start animation
  animate();
}

// If running in browser, initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', initGlobe);
}

// Export for use in other environments (e.g., Node.js for SSR)
module.exports = { initGlobe };
