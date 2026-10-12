// Mock DOM and Three.js before importing the module
const mockContainer = {
  clientWidth: 800,
  clientHeight: 600,
  appendChild: jest.fn(),
};

const mockTHREE = {
  Scene: jest.fn().mockImplementation(() => {
    return {
      background: null,
      add: jest.fn(),
    };
  }),
  PerspectiveCamera: jest.fn().mockImplementation(() => {
    return {
      position: {
        set: jest.fn(),
      },
      aspect: 0, // will be set in initGlobe
      updateProjectionMatrix: jest.fn(),
    };
  }),
  WebGLRenderer: jest.fn().mockImplementation(() => {
    return {
      setSize: jest.fn(),
      domElement: {},
      render: jest.fn(),
    };
  }),
  SphereGeometry: jest.fn().mockImplementation(() => {
    return {};
  }),
  MeshStandardMaterial: jest.fn().mockImplementation(() => {
    return {};
  }),
  Mesh: jest.fn().mockImplementation((geometry, material) => {
    return {
      geometry,
      material,
      rotation: { y: 0 },
    };
  }),
  DirectionalLight: jest.fn().mockImplementation(() => {
    return {
      position: {
        set: jest.fn(),
      },
    };
  }),
  AmbientLight: jest.fn().mockImplementation(() => {
    return {};
  }),
  Color: jest.fn().mockImplementation((color) => {
    // Return a mock object that represents a color
    return { color };
  }),
};

let initGlobe;
let rafCallCount = 0;
let rafCallback = null;
const YIELD_TO_BROWSER_CALLS = 14; // 7 yieldToBrowser calls * 2 RAF calls each

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  rafCallCount = 0;
  rafCallback = null;
  
  // Mock document.getElementById
  const documentGetElementByIdSpy = jest.spyOn(document, 'getElementById');
  documentGetElementByIdSpy.mockReturnValue(mockContainer);
  
  // Mock window.addEventListener
  const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');
  
  // Mock window.requestAnimationFrame
  const windowRequestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
  windowRequestAnimationFrameSpy.mockImplementation((cb) => {
    rafCallCount++;
    if (rafCallCount <= YIELD_TO_BROWSER_CALLS) {
      // For yieldToBrowser calls, call the callback immediately
      cb();
    } else {
      // For animation loop and beyond, store the callback without calling it
      rafCallback = cb;
    }
    // Return a fake requestId
    return Date.now() + rafCallCount;
  });
  
  // Mock THREE global
  global.THREE = mockTHREE;
  
  // Mock console
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  // Now import the module
  initGlobe = require('../../src/index').initGlobe;
});

// Helper function to get the stored callback (for animation loop testing)
const getStoredCallback = () => {
  return rafCallback;
};

afterEach(() => {
  jest.restoreAllMocks();
  rafCallCount = 0;
  rafCallback = null;
});

describe('initGlobe', () => {
  test('should log initialization message', async () => {
    await initGlobe();
    expect(console.log).toHaveBeenCalledWith('Meridian globe experience initialized');
  });

  test('should be a function', () => {
    expect(typeof initGlobe).toBe('function');
  });

  test('should create a scene when Three.js is available', async () => {
    await initGlobe();
    expect(mockTHREE.Scene).toHaveBeenCalled();
  });

  test('should create a camera', async () => {
    await initGlobe();
    expect(mockTHREE.PerspectiveCamera).toHaveBeenCalled();
  });

  test('should create a renderer and set its size', async () => {
    await initGlobe();
    expect(mockTHREE.WebGLRenderer).toHaveBeenCalled();
    const rendererInstance = mockTHREE.WebGLRenderer.mock.results[0].value;
    expect(rendererInstance.setSize).toHaveBeenCalledWith(800, 600);
  });

  test('should append the renderer domElement to the container', async () => {
    await initGlobe();
    expect(mockContainer.appendChild).toHaveBeenCalled();
  });

  test('should handle window resize event', async () => {
    await initGlobe();
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('should not throw when Three.js is undefined', async () => {
    // Set THREE to undefined
    const originalTHREE = global.THREE;
    global.THREE = undefined;
    await expect(() => {
      initGlobe();
    }).not.toThrow();
    global.THREE = originalTHREE;
  });

  // Additional tests to check internal calls
  test('should set scene background color', async () => {
    await initGlobe();
    const sceneInstance = mockTHREE.Scene.mock.results[0].value;
    expect(sceneInstance.background).toEqual({ color: 0x87ceeb });
  });

  test('should set camera position', async () => {
    await initGlobe();
    const cameraInstance = mockTHREE.PerspectiveCamera.mock.results[0].value;
    expect(cameraInstance.position.set).toHaveBeenCalledWith(0, 0, 5);
  });

  test('should create a sphere geometry', async () => {
    await initGlobe();
    expect(mockTHREE.SphereGeometry).toHaveBeenCalled();
  });

  test('should create a mesh material', async () => {
    await initGlobe();
    expect(mockTHREE.MeshStandardMaterial).toHaveBeenCalled();
  });

  test('should create a mesh with geometry and material', async () => {
    await initGlobe();
    const geometryInstance = mockTHREE.SphereGeometry.mock.results[0].value;
    const materialInstance = mockTHREE.MeshStandardMaterial.mock.results[0].value;
    expect(mockTHREE.Mesh).toHaveBeenCalledWith(geometryInstance, materialInstance);
  });

  test('should add mesh to scene', async () => {
    await initGlobe();
    expect(mockTHREE.Scene.mock.results[0].value.add).toHaveBeenCalled();
  });

  test('should add directional light to scene', async () => {
    await initGlobe();
    expect(mockTHREE.Scene.mock.results[0].value.add).toHaveBeenCalled();
  });

  test('should add ambient light to scene', async () => {
    await initGlobe();
    expect(mockTHREE.Scene.mock.results[0].value.add).toHaveBeenCalled();
  });

  test('should set directional light position', async () => {
    await initGlobe();
    expect(mockTHREE.DirectionalLight.mock.results[0].value.position.set).toHaveBeenCalledWith(5, 5, 5);
  });
  test('should log error and return when container element is not found', async () => {
    // Mock document.getElementById to return null
    const documentGetElementByIdSpy = jest.spyOn(document, 'getElementById');
    documentGetElementByIdSpy.mockReturnValue(null);
    
    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error');
    
    await initGlobe();
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Globe container element not found');
    
    // Restore the mock
    documentGetElementByIdSpy.mockRestore();
  });

  test('should log warning and return when Three.js is undefined', async () => {
    // Set THREE to undefined
    const originalTHREE = global.THREE;
    global.THREE = undefined;
    
    // Mock console.warn
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    
    await initGlobe();
    
    expect(consoleWarnSpy).toHaveBeenCalledWith('Three.js not found, globe visualization disabled');
    
    // Verify no Three.js objects were created
    expect(mockTHREE.Scene).not.toHaveBeenCalled();
    expect(mockTHREE.PerspectiveCamera).not.toHaveBeenCalled();
    expect(mockTHREE.WebGLRenderer).not.toHaveBeenCalled();
    expect(mockTHREE.SphereGeometry).not.toHaveBeenCalled();
    expect(mockTHREE.MeshStandardMaterial).not.toHaveBeenCalled();
    expect(mockTHREE.Mesh).not.toHaveBeenCalled();
    expect(mockTHREE.DirectionalLight).not.toHaveBeenCalled();
    expect(mockTHREE.AmbientLight).not.toHaveBeenCalled();
    
    // Restore the mock
    global.THREE = originalTHREE;
  });

  test('should call resize handler when window is resized', async () => {
    // Mock container with initial size
    const mockContainer = {
      clientWidth: 800,
      clientHeight: 600,
      appendChild: jest.fn(),
    };

    // Mock document.getElementById to return our container
    const documentGetElementByIdSpy = jest.spyOn(document, 'getElementById');
    documentGetElementByIdSpy.mockReturnValue(mockContainer);

    // Mock window.addEventListener to capture the resize handler
    const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');
    let resizeHandler = null;
    windowAddEventListenerSpy.mockImplementation((event, callback) => {
      if (event === 'resize') {
        resizeHandler = callback;
      }
    });

    // Mock window.requestAnimationFrame 
    const windowRequestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    windowRequestAnimationFrameSpy.mockImplementation((cb) => {
      rafCallCount++;
      if (rafCallCount <= YIELD_TO_BROWSER_CALLS) {
        // For yieldToBrowser calls, call the callback immediately
        cb();
      } else {
        // For animation loop and beyond, store the callback without calling it
        rafCallback = cb;
      }
      // Return a fake requestId
      return Date.now() + rafCallCount;
    });

    // Mock THREE global
    global.THREE = mockTHREE;

    // Mock console
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Import and initialize
    const { initGlobe } = require('../../src/index');
    await initGlobe();

    // Verify resize handler was registered
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(resizeHandler).toBeInstanceOf(Function);

    // Update container size to simulate resize
    mockContainer.clientWidth = 1024;
    mockContainer.clientHeight = 768;

    // Call the resize handler
    resizeHandler();

    // Verify camera aspect was updated
    const perspectiveCameraInstance = mockTHREE.PerspectiveCamera.mock.results[0].value;
    expect(perspectiveCameraInstance.aspect).toBe(1024 / 768);

    // Verify updateProjectionMatrix was called
    expect(perspectiveCameraInstance.updateProjectionMatrix).toHaveBeenCalled();

    // Verify renderer setSize was called with new dimensions
    const rendererInstance = mockTHREE.WebGLRenderer.mock.results[0].value;
    expect(rendererInstance.setSize).toHaveBeenCalledWith(1024, 768);

    // Restore mocks
    documentGetElementByIdSpy.mockRestore();
    windowAddEventListenerSpy.mockRestore();
    windowRequestAnimationFrameSpy.mockRestore();
    jest.restoreAllMocks();
  });

  test('should animate the sphere', async () => {
    await initGlobe();
    
    // Get the stored callback (should be the animation loop callback)
    const callback = getStoredCallback();
    expect(callback).toBeInstanceOf(Function);
    
    // Get the sphere instance from the mock
    const sphereInstance = mockTHREE.Mesh.mock.results[0].value;
    expect(sphereInstance).not.toBeNull();
    
    // Store initial rotation
    const initialRotation = sphereInstance.rotation.y;
    
    // Call the animation callback
    expect(() => {
      callback();
    }).not.toThrow();
    
    // Verify that the rotation has changed
    expect(sphereInstance.rotation.y).toBeGreaterThan(initialRotation);
  });
});
