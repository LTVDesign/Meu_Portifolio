// Mock para three.js e seus módulos
export const EffectComposer = jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    setSize: jest.fn(),
    dispose: jest.fn(),
}));

export const RenderPass = jest.fn().mockImplementation(() => ({}));

export const UnrealBloomPass = jest.fn().mockImplementation(() => ({}));

export const WebGLRenderTarget = jest.fn().mockImplementation(() => ({}));

export const ShaderPass = jest.fn().mockImplementation(() => ({}));

export const CopyShader = {
    uniforms: {},
    vertexShader: '',
    fragmentShader: '',
};

export const LuminosityHighPassShader = {
    uniforms: {},
    vertexShader: '',
    fragmentShader: '',
};

export const BlendFunction = {
    ADD: 1,
    ALPHA: 2,
    NORMAL: 3,
};