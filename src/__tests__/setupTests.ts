// @ts-nocheck
import '@testing-library/jest-dom';

// Mock manual para o módulo 'three' e 'three-stdlib'
jest.mock('three', () => {
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        set(x, y) { this.x = x; this.y = y; return this; }
        copy(v) { this.x = v.x; this.y = v.y; return this; }
    }
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        applyQuaternion() { return this; }
        normalize() { return this; }
        add() { return this; }
        sub() { return this; }
        multiplyScalar() { return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
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
        identity() { return this; }
        makeRotationFromQuaternion() { return this; }
        copy() { return this; }
    }
    class Quaternion {
        constructor(x = 0, y = 0, z = 0, w = 1) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        setFromEuler() { return this; }
        slerp() { return this; }
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
        set() { return this; }
    }
    class Object3D {
        constructor() {
            this.position = new Vector3();
            this.rotation = new Euler();
            this.scale = new Vector3(1, 1, 1);
            this.children = [];
            this.parent = null;
            this.up = new Vector3(0, 1, 0);
            this.matrix = new Matrix4();
        }
        add(obj) { this.children.push(obj); }
        remove(obj) { }
        updateMatrix() { }
        updateMatrixWorld() { }
        lookAt() { }
        clone() { return new Object3D(); }
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
        dispose() { }
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
    class Material {
        dispose() { }
    }
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
        dispose() { }
    }
    class TextureLoader {
        load(url, onLoad) {
            const tex = new Texture();
            if (onLoad) onLoad(tex);
            return tex;
        }
        setCrossOrigin(val) { return this; }
    }
    class WebGLRenderer {
        constructor() {
            this.domElement = document.createElement('canvas');
        }
        render() { }
        setSize() { }
        setPixelRatio() { }
        setClearColor() { }
        dispose() { }
    }
    class WebGLRenderTarget {
        constructor(width = 256, height = 256) {
            this.width = width;
            this.height = height;
            this.texture = new Texture();
        }
        setSize() { }
        dispose() { }
    }
    class Spherical {
        constructor(radius = 1, phi = 0, theta = 0) {
            this.radius = radius;
            this.phi = phi;
            this.theta = theta;
        }
    }
    class Cylindrical {
        constructor(radius = 1, theta = 0, y = 0) {
            this.radius = radius;
            this.theta = theta;
            this.y = y;
        }
    }
    class Box2 {
        constructor(min, max) {
            this.min = min || new Vector2();
            this.max = max || new Vector2();
        }
    }
    class Box3 {
        constructor(min, max) {
            this.min = min || new Vector3();
            this.max = max || new Vector3();
        }
    }
    class Sphere {
        constructor(center, radius = 1) {
            this.center = center || new Vector3();
            this.radius = radius;
        }
    }
    class Ray {
        constructor(origin, direction) {
            this.origin = origin || new Vector3();
            this.direction = direction || new Vector3();
        }
    }
    class Plane {
        constructor(normal, constant = 0) {
            this.normal = normal || new Vector3();
            this.constant = constant;
        }
    }
    class Frustum {
        constructor() {
            this.planes = Array(6).fill(null).map(() => ({}));
        }
    }
    class Triangle {
        constructor(a, b, c) {
            this.a = a || new Vector3();
            this.b = b || new Vector3();
            this.c = c || new Vector3();
        }
    }
    class Curve {
        getPoint(t) { return new Vector3(); }
    }
    class Path extends Curve {
        constructor(points) {
            super();
            this.points = points || [];
        }
    }
    class Shape extends Path {
        constructor(points) {
            super(points);
        }
    }
    class Line3 {
        constructor(start, end) {
            this.start = start || new Vector3();
            this.end = end || new Vector3();
        }
    }
    class CatmullRomCurve3 extends Curve {
        constructor(points) {
            super();
            this.points = points || [];
        }
    }
    class CubicBezierCurve3 extends Curve {
        constructor(v0, v1, v2, v3) {
            super();
            this.v0 = v0 || new Vector3();
            this.v1 = v1 || new Vector3();
            this.v2 = v2 || new Vector3();
            this.v3 = v3 || new Vector3();
        }
    }
    class EllipseCurve {
        constructor(x = 0, y = 0, xRadius = 1, yRadius = 1, startAngle = 0, endAngle = 2 * Math.PI, clockwise = false, rotation = 0) {
            this.x = x;
            this.y = y;
            this.xRadius = xRadius;
            this.yRadius = yRadius;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.clockwise = clockwise;
            this.rotation = rotation;
        }
        getPoint(t) { return new Vector3(); }
    }
    class ArcCurve extends EllipseCurve {
        constructor(x = 0, y = 0, radius = 1, startAngle = 0, endAngle = 2 * Math.PI, clockwise = false) {
            super(x, y, radius, radius, startAngle, endAngle, clockwise, 0);
        }
    }
    class SplineCurve extends Curve {
        constructor(points) {
            super();
            this.points = points || [];
        }
    }
    class Bone extends Object3D { }
    class SkinnedMesh extends Mesh {
        constructor(geometry, material) {
            super(geometry, material);
        }
    }
    class Skeleton {
        constructor(bones = [], boneInverses = []) {
            this.bones = bones;
            this.boneInverses = boneInverses;
        }
    }
    class AnimationMixer {
        constructor(root) { }
        clipAction(clip) { return {}; }
        update(delta) { }
    }
    class AnimationClip {
        constructor(name = '', duration = 0, tracks = []) {
            this.name = name;
            this.duration = duration;
            this.tracks = tracks;
        }
    }
    class KeyframeTrack {
        constructor(name, times, values) {
            this.name = name;
            this.times = times;
            this.values = values;
        }
    }
    class VectorKeyframeTrack extends KeyframeTrack {
        constructor(name, times, values) {
            super(name, times, values);
        }
    }
    class QuaternionKeyframeTrack extends KeyframeTrack {
        constructor(name, times, values) {
            super(name, times, values);
        }
    }
    class NumberKeyframeTrack extends KeyframeTrack {
        constructor(name, times, values) {
            super(name, times, values);
        }
    }
    class Loader {
        load(url, onLoad, onProgress, onError) { }
        setCrossOrigin(val) { return this; }
    }
    class FileLoader extends Loader {
        load(url, onLoad, onProgress, onError) {
            return Promise.resolve(null);
        }
    }
    class MD2Loader extends Loader {
        load(url, onLoad, onProgress, onError) {
            return Promise.resolve({});
        }
    }

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
        Spherical,
        Cylindrical,
        Box2,
        Box3,
        Sphere,
        Ray,
        Plane,
        Frustum,
        Triangle,
        Curve,
        Path,
        Shape,
        Line3,
        CatmullRomCurve3,
        CubicBezierCurve3,
        EllipseCurve,
        ArcCurve,
        SplineCurve,
        Bone,
        SkinnedMesh,
        Skeleton,
        AnimationMixer,
        AnimationClip,
        KeyframeTrack,
        VectorKeyframeTrack,
        QuaternionKeyframeTrack,
        NumberKeyframeTrack,
        Loader,
        FileLoader,
        MD2Loader,
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

    return THREE;
});

// Mock para IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor(_callback) { }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
    root = null;
    rootMargin = '';
    thresholds = [];
};

// Mock para i18next-browser-languagedetector
jest.mock('i18next-browser-languagedetector', () => ({
    __esModule: true,
    default: {
        type: 'languageDetector',
        name: 'languageDetector',
        init: jest.fn(),
        detect: jest.fn(() => 'pt'),
        cacheUserLanguage: jest.fn(),
    },
}));

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock para ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// Mock para canvas
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: [] })),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    measureText: jest.fn(() => ({ width: 0, actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0 })),
})) as any;
