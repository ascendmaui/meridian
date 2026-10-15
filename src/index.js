// Meridian Globe Experience
// Entry point for the interactive globe application

/**
 * Initialize the globe experience
 * @returns {Promise<void>}
 */
async function initGlobe() {
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

  // Yield to browser after initial setup
  await yieldToBrowser();

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue

  // Yield to browser
  await yieldToBrowser();

  // Create camera
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 600;
  const camera = new THREE.PerspectiveCamera(
    75, // field of view
    width / height, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.set(0, 0, 5);

  // Yield to browser
  await yieldToBrowser();

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Yield to browser
  await yieldToBrowser();

  // Create sphere (globe)
  const geometry = new THREE.SphereGeometry(1, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00bfff,
    metalness: 0.2,
    roughness: 0.8
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Yield to browser
  await yieldToBrowser();

  // Add lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Yield to browser
  await yieldToBrowser();

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // Yield to browser
  await yieldToBrowser();

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

// Helper function to yield to browser using requestAnimationFrame
function yieldToBrowser() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

// If running in browser, initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    initGlobe().catch(err => {
      console.error('Failed to initialize globe:', err);
    });
  });
}

// Export for use in other environments (e.g., Node.js for SSR)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initGlobe };
}
