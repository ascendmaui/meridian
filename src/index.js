// Meridian Globe Experience
// Entry point for the interactive globe application

/**
 * Initialize the globe experience
 * @returns {void}
 */
function initGlobe() {
  console.log('Meridian globe experience initialized');
  
  // Check if Three.js is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not found, globe visualization disabled');
    return;
  }

  // Get the container element
  const container = document.getElementById('globe-container');
  if (!container) {
    console.error('Globe container element not found');
    return;
  }

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75, // field of view
    container.clientWidth / container.clientHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.set(0, 0, 5);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create sphere (globe)
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00bfff,
    metalness: 0.2,
    roughness: 0.8
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Add lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the sphere slowly
    sphere.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  }
  
  animate();

  // Handle window resize
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize);
}

// If running in browser, initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', initGlobe);
}

// Export for use in other environments (e.g., Node.js for SSR)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initGlobe };
}
