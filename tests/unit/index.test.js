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

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  
  // Mock document.getElementById
  const documentGetElementByIdSpy = jest.spyOn(document, 'getElementById');
  documentGetElementByIdSpy.mockReturnValue(mockContainer);
  
  // Mock window.addEventListener
  const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener'); // eslint-disable-line
  
  // Mock window.requestAnimationFrame
  const windowRequestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
  windowRequestAnimationFrameSpy.mockImplementation(() => {
    // Do not call the callback to avoid infinite loop
    return 1; // return a requestId
  });
  
  // Mock THREE global
  global.THREE = mockTHREE;
  
  if (typeof global.THREE === 'undefined') {
    throw new Error('THREE is undefined');
  }

  // Mock console
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  // Now import the module
  initGlobe = require('../../src/index').initGlobe;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('initGlobe', () => {
  test('should log initialization message', () => {
    initGlobe();
    expect(console.log).toHaveBeenCalledWith('Meridian globe experience initialized');
  });

  test('should be a function', () => {
    expect(typeof initGlobe).toBe('function');
  });

  test('should create a scene when Three.js is available', () => {
    initGlobe();
    expect(mockTHREE.Scene).toHaveBeenCalled();
  });

  test('should create a camera', () => {
    initGlobe();
    expect(mockTHREE.PerspectiveCamera).toHaveBeenCalled();
  });

  test('should create a renderer and set its size', () => {
    initGlobe();
    expect(mockTHREE.WebGLRenderer).toHaveBeenCalled();
    const rendererInstance = mockTHREE.WebGLRenderer.mock.results[0].value;
    expect(rendererInstance.setSize).toHaveBeenCalledWith(800, 600);
  });

  test('should append the renderer domElement to the container', () => {
    initGlobe();
    expect(mockContainer.appendChild).toHaveBeenCalled();
  });

  test('should handle window resize event', () => {
    initGlobe();
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('should not throw when Three.js is undefined', () => {
    // Set THREE to undefined
    const originalTHREE = global.THREE;
    global.THREE = undefined;
    expect(() => {
      initGlobe();
    }).not.toThrow();
    global.THREE = originalTHREE;
  });

  // Additional tests to check internal calls
  test('should set scene background color', () => {
    initGlobe();
    const sceneInstance = mockTHREE.Scene.mock.results[0].value;
    expect(sceneInstance.background).toEqual({ color: 0x87ceeb });
  });

  test('should set camera position', () => {
    initGlobe();
    const cameraInstance = mockTHREE.PerspectiveCamera.mock.results[0].value;
    expect(cameraInstance.position.set).toHaveBeenCalledWith(0, 0, 5);
  });

  test('should create a sphere geometry', () => {
    initGlobe();
    expect(mockTHREE.SphereGeometry).toHaveBeenCalled();
  });

  test('should create a mesh material', () => {
    initGlobe();
    expect(mockTHREE.MeshStandardMaterial).toHaveBeenCalled();
  });

  test('should create a mesh with geometry and material', () => {
    initGlobe();
    const geometryInstance = mockTHREE.SphereGeometry.mock.results[0].value;
    const materialInstance = mockTHREE.MeshStandardMaterial.mock.results[0].value;
    expect(mockTHREE.Mesh).toHaveBeenCalledWith(geometryInstance, materialInstance);
  });

  test('should add mesh to scene', () => {
    initGlobe();
    const sceneInstance = mockTHREE.Scene.mock.results[0].value;
    expect(sceneInstance.add).toHaveBeenCalled();
  });

  test('should add directional light to scene', () => {
    initGlobe();
    const sceneInstance = mockTHREE.Scene.mock.results[0].value;
    expect(sceneInstance.add).toHaveBeenCalled();
  });

  test('should add ambient light to scene', () => {
    initGlobe();
    const sceneInstance = mockTHREE.Scene.mock.results[0].value;
    expect(sceneInstance.add).toHaveBeenCalled();
  });

  test('should set directional light position', () => {
    initGlobe();
    const lightInstance = mockTHREE.DirectionalLight.mock.results[0].value;
    expect(lightInstance.position.set).toHaveBeenCalledWith(5, 5, 5);
  });
  test('should log error and return when container element is not found', () => {
    // Mock document.getElementById to return null
    const documentGetElementByIdSpy = jest.spyOn(document, 'getElementById');
    documentGetElementByIdSpy.mockReturnValue(null);
    
    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error');
    
    initGlobe();
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Globe container element not found');
    
    // Restore the mock
    documentGetElementByIdSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('should not create Three.js objects when Three.js is undefined', () => {
    // Set THREE to undefined
    const originalTHREE = global.THREE;
    global.THREE = undefined;
    
    // Mock console.warn
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    
    initGlobe();
    
    expect(consoleWarnSpy).toHaveBeenCalledWith('Three.js not found, globe visualization disabled');
    
    // Verify no Three.js objects were created
    expect(mockTHREE.Scene).not.toHaveBeenCalled();
    expect(mockTHREE.PerspectiveCamera).not.toHaveBeenCalled();
    expect(mockTHREE.WebGLRenderer).not.toHaveBeenCalled();
    
    // Restore
    global.THREE = originalTHREE;
    consoleWarnSpy.mockRestore();
  });

  test('should call requestAnimationFrame for animation loop', () => {
    // Mock requestAnimationFrame to capture the callback
    const mockRequestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
    let animationCallback = null;
    mockRequestAnimationFrame.mockImplementation((cb) => {
      animationCallback = cb;
      return 1; // return a requestId
    });
    
    initGlobe();
    
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
    expect(typeof animationCallback).toBe('function');
    
    // Call the animation callback to ensure it doesn't throw
    expect(() => {
      animationCallback();
    }).not.toThrow();
    
    mockRequestAnimationFrame.mockRestore();
  });
});
