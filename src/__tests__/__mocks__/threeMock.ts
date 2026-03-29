// @ts-nocheck
// Mock para three.js - versão simplificada e funcional

// ========== CLASSES BÁSICAS ==========

class Vector2 {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    copy(v: any) { this.x = v.x; this.y = v.y; return this; }
}

class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    copy(v: any) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
}

class Vector4 {
    x = 0;
    y = 0;
    z = 0;
    w = 0;
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    copy(v: any) { this.x = v.x; this.y = v.y; this.z = v.z; this.w = v.w; return this; }
}

class Matrix4 {
    elements: Float32Array;
    constructor() {
        this.elements = new Float32Array(16);
    }
}

class Quaternion {
    x = 0;
    y = 0;
    z = 0;
    w = 1;
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    copy(q: any) { this.x = q.x; this.y = q.y; this.z = q.z; this.w = q.w; return this; }
}

class Euler {
    x = 0;
    y = 0;
    z = 0;
    order = 'XYZ';
    constructor(x = 0, y = 0, z = 0, order = 'XYZ') {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
    }
    copy(e: any) { this.x = e.x; this.y = e.y; this.z = e.z; this.order = e.order; return this; }
}

class Color {
    r = 1;
    g = 1;
    b = 1;
    constructor(color?: any) { }
}

// ========== OBJETOS 3D ==========

class Object3D {
    position = new Vector3();
    rotation = new Euler();
    scale = new Vector3(1, 1, 1);
    children: any[] = [];
    constructor() { }
    add(object: any) { this.children.push(object); }
    remove(object: any) { }
}

class Group extends Object3D {
    isGroup = true;
}

class Scene extends Object3D { }

class Camera extends Object3D {
    matrixWorldInverse = new Matrix4();
    projectionMatrix = new Matrix4();
    isCamera = true;
}

class PerspectiveCamera extends Camera {
    fov = 50;
    aspect = 1;
    near = 0.1;
    far = 2000;
    zoom = 1;
    constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
}

class OrthographicCamera extends Camera {
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
    zoom = 1;
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number) {
        super();
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.near = near;
        this.far = far;
    }
}

// ========== GEOMETRIA ==========

class BufferGeometry {
    attributes: any = {};
    index: any = null;
    constructor() { }
    setAttribute(name: string, attribute: any) { this.attributes[name] = attribute; }
    getAttribute(name: string) { return this.attributes[name] || null; }
}

class BufferAttribute {
    array: any;
    itemSize: number;
    count: number;
    constructor(array: any, itemSize: number) {
        this.array = array;
        this.itemSize = itemSize;
        this.count = array.length / itemSize;
    }
}

class Float32BufferAttribute extends BufferAttribute {
    constructor(array: Float32Array, itemSize: number) {
        super(array, itemSize);
    }
}

class Mesh extends Object3D {
    geometry = new BufferGeometry();
    material: any;
    isMesh = true;
}

class Material { }

class MeshBasicMaterial extends Material {
    type = 'MeshBasicMaterial';
    color: any = new Color();
}

class MeshStandardMaterial extends Material {
    type = 'MeshStandardMaterial';
    color: any = new Color();
    roughness = 1;
    metalness = 0;
}

// ========== TEXTURAS E RENDERIZAÇÃO ==========

class Texture {
    image: any = null;
    wrapS = 1001;
    wrapT = 1001;
    repeat = { x: 1, y: 1 };
    offset = { x: 0, y: 0 };
    rotation = 0;
    center = { x: 0.5, y: 0.5 };
    minFilter = 1006;
    magFilter = 1006;
    needsUpdate = false;
}

class TextureLoader {
    load(url: string, onLoad?: (texture: Texture) => void) {
        return Promise.resolve(new Texture()).then(texture => {
            if (onLoad) onLoad(texture);
            return texture;
        });
    }
    setCrossOrigin(val: string) { return this; }
}

class WebGLRenderer {
    domElement = document.createElement('canvas');
    constructor() { }
}

class WebGLRenderTarget {
    width = 256;
    height = 256;
    texture = new Texture();
    constructor(width = 256, height = 256) {
        this.width = width;
        this.height = height;
    }
}

// ========== CLASSES MATH (usadas pelo maath) ==========

class Spherical {
    radius = 1;
    phi = 0;
    theta = 0;
    constructor(radius = 1, phi = 0, theta = 0) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
    }
    copy(s: any) { this.radius = s.radius; this.phi = s.phi; this.theta = s.theta; return this; }
}

class Cylindrical {
    radius = 1;
    theta = 0;
    y = 0;
    constructor(radius = 1, theta = 0, y = 0) {
        this.radius = radius;
        this.theta = theta;
        this.y = y;
    }
    copy(c: any) { this.radius = c.radius; this.theta = c.theta; this.y = c.y; return this; }
}

class Box2 {
    min = new Vector2();
    max = new Vector2();
    constructor(min?: Vector2, max?: Vector2) {
        if (min) this.min.copy(min);
        if (max) this.max.copy(max);
    }
    copy(b: any) {
        this.min.copy(b.min);
        this.max.copy(b.max);
        return this;
    }
}

class Box3 {
    min = new Vector3();
    max = new Vector3();
    constructor(min?: Vector3, max?: Vector3) {
        if (min) this.min.copy(min);
        if (max) this.max.copy(max);
    }
    copy(b: any) {
        this.min.copy(b.min);
        this.max.copy(b.max);
        return this;
    }
}

class Sphere {
    center = new Vector3();
    radius = 1;
    constructor(center?: Vector3, radius = 1) {
        if (center) this.center.copy(center);
        this.radius = radius;
    }
    copy(s: any) {
        this.center.copy(s.center);
        this.radius = s.radius;
        return this;
    }
}

class Ray {
    origin = new Vector3();
    direction = new Vector3();
    constructor(origin?: Vector3, direction?: Vector3) {
        if (origin) this.origin.copy(origin);
        if (direction) this.direction.copy(direction);
    }
    copy(r: any) {
        this.origin.copy(r.origin);
        this.direction.copy(r.direction);
        return this;
    }
}

class Plane {
    normal = new Vector3();
    constant = 0;
    constructor(normal?: Vector3, constant = 0) {
        if (normal) this.normal.copy(normal);
        this.constant = constant;
    }
    copy(p: any) {
        this.normal.copy(p.normal);
        this.constant = p.constant;
        return this;
    }
}

class Frustum {
    planes: any[] = [];
    constructor() {
        this.planes = Array(6).fill(null).map(() => ({}));
    }
}

class Triangle {
    a = new Vector3();
    b = new Vector3();
    c = new Vector3();
    constructor(a?: Vector3, b?: Vector3, c?: Vector3) {
        if (a) this.a.copy(a);
        if (b) this.b.copy(b);
        if (c) this.c.copy(c);
    }
}



// Classes de geometria adicionais
class Curve {
    getPoint(t: number) { return new Vector3(); }
}

class Path extends Curve {
    points: Vector3[] = [];
    constructor(points?: Vector3[]) {
        super();
        if (points) this.points = points;
    }
    getPoint(t: number) { return new Vector3(); }
}

class Shape extends Path {
    curves: any[] = [];
    constructor(points?: Vector3[]) {
        super(points);
    }
}

class Line3 {
    start = new Vector3();
    end = new Vector3();
    constructor(start?: Vector3, end?: Vector3) {
        if (start) this.start.copy(start);
        if (end) this.end.copy(end);
    }
    copy(l: any) {
        this.start.copy(l.start);
        this.end.copy(l.end);
        return this;
    }
}

class CatmullRomCurve3 extends Curve {
    points: Vector3[] = [];
    constructor(points?: Vector3[]) {
        super();
        if (points) this.points = points;
    }
    getPoint(t: number) { return new Vector3(); }
}

class CubicBezierCurve3 extends Curve {
    v0 = new Vector3();
    v1 = new Vector3();
    v2 = new Vector3();
    v3 = new Vector3();
    constructor(v0?: Vector3, v1?: Vector3, v2?: Vector3, v3?: Vector3) {
        super();
        if (v0) this.v0.copy(v0);
        if (v1) this.v1.copy(v1);
        if (v2) this.v2.copy(v2);
        if (v3) this.v3.copy(v3);
    }
    getPoint(t: number) { return new Vector3(); }
}

class EllipseCurve {
    aX = 0;
    aY = 0;
    xRadius = 1;
    yRadius = 1;
    aStartAngle = 0;
    aEndAngle = 2 * Math.PI;
    aClockwise = false;
    aRotation = 0;
    constructor(x = 0, y = 0, xRadius = 1, yRadius = 1, startAngle = 0, endAngle = 2 * Math.PI, clockwise = false, rotation = 0) {
        this.aX = x;
        this.aY = y;
        this.xRadius = xRadius;
        this.yRadius = yRadius;
        this.aStartAngle = startAngle;
        this.aEndAngle = endAngle;
        this.aClockwise = clockwise;
        this.aRotation = rotation;
    }
    getPoint(t: number) { return new Vector3(); }
}

class ArcCurve extends EllipseCurve {
    constructor(x = 0, y = 0, radius = 1, startAngle = 0, endAngle = 2 * Math.PI, clockwise = false) {
        super(x, y, radius, radius, startAngle, endAngle, clockwise, 0);
    }
}

class SplineCurve extends Curve {
    points: Vector3[] = [];
    constructor(points?: Vector3[]) {
        super();
        if (points) this.points = points;
    }
    getPoint(t: number) { return new Vector3(); }
}

// ========== CLASSES PARA ANIMAÇÃO ==========

class Bone extends Object3D { }

class SkinnedMesh extends Mesh {
    skeleton: any;
    bindMode = '';
    bindMatrix = new Matrix4();
    constructor(geometry?: BufferGeometry, material?: Material) {
        super();
        this.geometry = geometry || new BufferGeometry();
        this.material = material || new Material();
    }
}

class Skeleton {
    bones: Bone[] = [];
    boneInverses: Matrix4[] = [];
    constructor(bones: Bone[] = [], boneInverses: Matrix4[] = []) {
        this.bones = bones;
        this.boneInverses = boneInverses;
    }
}

class AnimationMixer {
    constructor(root: Object3D) { }
    clipAction(clip: any) { return {}; }
    update(delta: number) { }
}

class AnimationClip {
    name = '';
    duration = 0;
    tracks: any[] = [];
    constructor(name: string = '', duration: number = 0, tracks: any[] = []) {
        this.name = name;
        this.duration = duration;
        this.tracks = tracks;
    }
}

class KeyframeTrack {
    name = '';
    times: number[] = [];
    values: number[] = [];
    constructor(name: string, times: number[], values: number[]) {
        this.name = name;
        this.times = times;
        this.values = values;
    }
}

class VectorKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: number[]) {
        super(name, times, values);
    }
}

class QuaternionKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: number[]) {
        super(name, times, values);
    }
}

class NumberKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: number[], values: number[]) {
        super(name, times, values);
    }
}

// ========== LOADERS ==========

class Loader {
    constructor() { }
    load(url: string, onLoad?: any, onProgress?: any, onError?: any) { }
    setCrossOrigin(value: string) { return this; }
}

class FileLoader extends Loader {
    responseType = '';
    load(url: string, onLoad?: any, onProgress?: any, onError?: any) {
        return Promise.resolve(null);
    }
}

class MD2Loader extends Loader {
    load(url: string, onLoad?: any, onProgress?: any, onError?: any) {
        return Promise.resolve({});
    }
}

// ========== NAMESPACE THREE ==========

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
    // Classes de curvas
    CurvePath,
    // Constant values
    FrontSide: 0,
    BackSide: 1,
    DoubleSide: 2,
    CullFaceFrontSide: 0,
    CullFaceBackSide: 1,
    CullFaceNone: 2,
    FrontFaceDirectionCW: 0,
    FrontFaceDirectionCCW: 1,
    BasicShadowMap: 0,
    PCFShadowMap: 1,
    PCFSoftShadowMap: 2,
    NoBlending: 0,
    NormalBlending: 1,
    AdditiveBlending: 2,
    SubtractiveBlending: 3,
    MultiplyBlending: 4,
    CustomBlending: 5,
    AddEquation: 100,
    SubtractEquation: 101,
    ReverseSubtractEquation: 102,
    MinEquation: 103,
    MaxEquation: 104,
    ZeroFactor: 0,
    OneFactor: 1,
    SrcAlphaFactor: 2,
    OneMinusSrcAlphaFactor: 3,
    DstAlphaFactor: 4,
    OneMinusDstAlphaFactor: 5,
    DstColorFactor: 6,
    OneMinusDstColorFactor: 7,
    SrcAlphaSaturateFactor: 8,
    RGBFormat: 1000,
    RGBAFormat: 1001,
    LuminanceFormat: 1002,
    LuminanceAlphaFormat: 1003,
    DepthFormat: 1004,
    DepthStencilFormat: 1005,
    UnsignedByteType: 1006,
    ShortType: 1007,
    UnsignedShortType: 1008,
    IntType: 1009,
    UnsignedIntType: 1010,
    FloatType: 1011,
    HalfFloatType: 1012,
    UnsignedShort4444Type: 1013,
    UnsignedShort5551Type: 1014,
    UnsignedShort565Type: 1015,
    VertexShader: 2000,
    FragmentShader: 2001,
    GeometryShader: 2002,
    NearestFilter: 1000,
    LinearFilter: 1001,
    NearestMipmapNearestFilter: 1002,
    LinearMipmapNearestFilter: 1003,
    NearestMipmapLinearFilter: 1004,
    LinearMipmapLinearFilter: 1005,
    RepeatWrapping: 1000,
    ClampToEdgeWrapping: 1001,
    MirroredRepeatWrapping: 1002,
    CubeReflectionMapping: 3000,
    CubeRefractionMapping: 3001,
    EquirectangularReflectionMapping: 3002,
    EquirectangularRefractionMapping: 3003,
    UV1: { x: 0, y: 0 },
    UV2: { x: 0, y: 0 },
    TAG: '',
    HORIZONTAL: 0,
    VERTICAL: 1,
    REVISION: 'mock',
    Math: {
        clamp: (value: number, min: number, max: number) => Math.max(min, Math.min(max, value)),
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
    },
    MathUtils: {
        clamp: (value: number, min: number, max: number) => Math.max(min, Math.min(max, value)),
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
    },
};

// Constantes separadas para exportação
const REVISION = 'mock';
const VERSION = { REVISION, VERSION: 'mock' };

// ========== EXPORTAÇÕES ==========

export {
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
};

// ========== MÓDULOS THREE/EXAMPLES/JSM ==========

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

export const Preload = jest.fn().mockImplementation(({ children }: any) => children);
export const useGLTF = jest.fn().mockReturnValue({ scene: new Group(), materials: {}, animations: [] });
export const useTexture = jest.fn().mockReturnValue({ map: new Texture() });
export const useProgress = jest.fn().mockReturnValue({ progress: 100, loaded: 1, total: 1 });
export const Html = jest.fn().mockImplementation(({ children }: any) => children);
export const PointMaterial = jest.fn().mockImplementation(() => null);
export const Points = jest.fn().mockImplementation(() => null);
export const Decal = jest.fn().mockImplementation(() => null);
export const Float = jest.fn().mockImplementation(({ children }: any) => children);
export const Text = jest.fn().mockImplementation(() => null);
export const useFrame = jest.fn().mockImplementation((callback: any) => callback);
export const useThree = jest.fn().mockReturnValue({
    gl: {},
    camera: new PerspectiveCamera(),
    size: { width: 800, height: 600 },
    scene: new Scene(),
});
export const Suspense = jest.fn().mockImplementation(({ children }: any) => children);
export const AdaptiveDpr = jest.fn().mockImplementation(({ children }: any) => children);
export const AdaptiveEvents = jest.fn().mockImplementation(({ children }: any) => children);
export const InstancedMesh = jest.fn().mockImplementation((geometry: any, material: any, count: number) => ({
    ...new Object3D(),
    count,
    instanceMatrix: new BufferAttribute(new Float32Array(count * 16), 16),
    setMatrixAt: jest.fn(),
    getMatrixAt: jest.fn(),
    isInstancedMesh: true,
}));

// Export default
export default THREE;