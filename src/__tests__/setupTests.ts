import '@testing-library/jest-dom';

// Mock para IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback: IntersectionObserverCallback) { }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
    root: Element | null = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [];
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
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;
