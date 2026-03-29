// @ts-nocheck
// Mock simplificado para three.js

// Classes básicas
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

class Matrix4 {
    constructor() {
        this.elements = new Float32Array(16);
    }
}

class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

class Euler {
    constructor(x = 0, y = 0, z = 0, order = 'XYZ') {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
    }
}

class Color {
    constructor(color) { }
}

class Object3D {
    constructor() {
        this.position = new Vector3();
        this.rotation = new Euler();
        this.scale = new Vector3(1, 1, 1);
        this.children = [];
    }
    add(obj) { this.children.push(obj); }
    remove(obj) { }
}

class Group extends Object3D { }
class Scene extends Object3D { }
class Camera extends Object3D { }
class PerspectiveCamera extends Camera { }
class OrthographicCamera extends Camera { }

class BufferGeometry {
    constructor() {
        this.attributes = {};
    }
    setAttribute(name, attr) { this.attributes[name] = attr; }
    getAttribute(name) { return this.attributes[name] || null; }
}

class BufferAttribute {
    constructor(array, itemSize) {
        this.array = array;
        this.itemSize = itemSize;
    }
}

class Float32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize) {
        super(array, itemSize);
    }
}

class Mesh extends Object3D {
    constructor(geometry, material) {
        super();
        this.geometry = geometry || new BufferGeometry();
        this.material = material || new Material();
    }
}

class Material { }

class MeshBasicMaterial extends Material {
    constructor() {
        super();
        this.color = new Color();
    }
}

class MeshStandardMaterial extends Material {
    constructor() {
        super();
        this.color = new Color();
        this.roughness = 1;
        this.metalness = 0;
    }
}

class Texture {
    constructor() {
        this.image = null;
        this.wrapS = 1001;
        this.wrapT = 1001;
        this.repeat = { x: 1, y: 1 };
        this.offset = { x: 0, y: 0 };
        this.rotation = 0;
        this.center = { x: 0.5, y: 0.5 };
        this.minFilter = 1006;
        this.magFilter = 1006;
        this.needsUpdate = false;
    }
}

class TextureLoader {
    load(url, onLoad) {
        return Promise.resolve(new Texture()).then(tex => {
            if (onLoad) onLoad(tex);
            return tex;
        });
    }
    setCrossOrigin(val) { return this; }
}

class WebGLRenderer {
    constructor() {
        this.domElement = document.createElement('canvas');
    }
}

class WebGLRenderTarget {
    constructor(width = 256, height = 256) {
        this.width = width;
        this.height = height;
        this.texture = new Texture();
    }
}

// Namespace THREE
const THREE = {
    Vector2,
    Vector3,
    Vector4,
    Matrix4,
    Quaternion,
    Euler,
    Color,
    Object3D,
    Group,
    Scene,
    Camera,
    PerspectiveCamera,
    OrthographicCamera,
    BufferGeometry,
    BufferAttribute,
    Float32BufferAttribute,
    Mesh,
    Material,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Texture,
    TextureLoader,
    WebGLRenderer,
    WebGLRenderTarget,
    // Constantes
    REVISION: 'mock',
    VERSION: { REVISION: 'mock', VERSION: 'mock' },
    FrontSide: 0,
    BackSide: 1,
    DoubleSide: 2,
    Math: {
        clamp: (v, min, max) => Math.max(min, Math.min(max, v)),
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
    },
    MathUtils: {
        clamp: (v, min, max) => Math.max(min, Math.min(max, v)),
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
    },
};

// Módulos do three/examples/jsm/
export const EffectComposer = jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    setSize: jest.fn(),
    dispose: jest.fn(),
    addPass: jest.fn(),
    removePass: jest.fn(),
    passes: [],
}));

export const RenderPass = jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    setSize: jest.fn(),
    dispose: jest.fn(),
}));

export const UnrealBloomPass = jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    setSize: jest.fn(),
    dispose: jest.fn(),
}));

export const ShaderPass = jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    setSize: jest.fn(),
    dispose: jest.fn(),
    uniforms: {},
}));

export const CopyShader = { uniforms: {}, vertexShader: '', fragmentShader: '' };
export const LuminosityHighPassShader = { uniforms: {}, vertexShader: '', fragmentShader: '' };
export const BlendFunction = { ADD: 1, ALPHA: 2, NORMAL: 3 };

export const OrbitControls = jest.fn().mockImplementation(() => ({
    enableDamping: true,
    dampingFactor: 0.05,
    target: new Vector3(),
    object: new Object3D(),
    update: jest.fn(),
    dispose: jest.fn(),
}));

export const Preload = jest.fn().mockImplementation(({ children }) => children);
export const useGLTF = jest.fn().mockReturnValue({ scene: new Group(), materials: {}, animations: [] });
export const useTexture = jest.fn().mockReturnValue({ map: new Texture() });
export const useProgress = jest.fn().mockReturnValue({ progress: 100, loaded: 1, total: 1 });
export const Html = jest.fn().mockImplementation(({ children }) => children);
export const PointMaterial = jest.fn().mockImplementation(() => null);
export const Points = jest.fn().mockImplementation(() => null);
export const Decal = jest.fn().mockImplementation(() => null);
export const Float = jest.fn().mockImplementation(({ children }) => children);
export const Text = jest.fn().mockImplementation(() => null);
export const useFrame = jest.fn().mockImplementation((callback) => callback);
export const useThree = jest.fn().mockReturnValue({
    gl: {},
    camera: new PerspectiveCamera(),
    size: { width: 800, height: 600 },
    scene: new Scene(),
});
export const Suspense = jest.fn().mockImplementation(({ children }) => children);
export const AdaptiveDpr = jest.fn().mockImplementation(({ children }) => children);
export const AdaptiveEvents = jest.fn().mockImplementation(({ children }) => children);
export const InstancedMesh = jest.fn().mockImplementation((geometry, material, count) => ({
    ...new Object3D(),
    count,
    instanceMatrix: new BufferAttribute(new Float32Array(count * 16), 16),
    setMatrixAt: jest.fn(),
    getMatrixAt: jest.fn(),
    isInstancedMesh: true,
}));

// Exportar tudo
export default THREE;
export { THREE };