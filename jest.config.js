/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    // Aliases simplificados (um só)
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
        '^@/(.*)$': '<rootDir>/src/$1',

        // Mocks completos para Three.js + R3F
        '^three$': '<rootDir>/src/__tests__/__mocks__/threeMock.ts',
        '^three/examples/jsm/(.*)$': '<rootDir>/src/__tests__/__mocks__/threeMock.ts',
        '^three-stdlib$': '<rootDir>/src/__tests__/__mocks__/threeMock.ts',
        '^three-stdlib/(.*)$': '<rootDir>/src/__tests__/__mocks__/threeMock.ts',
        '^@react-three/(.*)$': '<rootDir>/src/__tests__/__mocks__/reactThreeMock.ts',

        // Framer Motion mock
        '^framer-motion$': '<rootDir>/src/__tests__/__mocks__/framerMotionMock.ts',
    },

    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],

    testMatch: ['**/__tests__/**/*.{test,spec}.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],

    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.json',
            isolatedModules: true,
        }],
    },

    // Transformar @react-three, three, three-stdlib, framer-motion
    transformIgnorePatterns: [
        'node_modules/(?!(@react-three|three|three-stdlib|framer-motion)/)'
    ],

    // Extensões de arquivo
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    // Coverage mais realista para projeto com Three.js
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
        '!src/App.tsx',
        '!src/**/index.ts',
        '!src/i18n/**',
        '!src/assets/**',
        '!src/__tests__/**',
        '!src/components/canvas/**', // difícil de testar 3D
    ],

    coverageThreshold: {
        global: {
            branches: 60,
            functions: 65,
            lines: 70,
            statements: 70,
        },
    },

    // Configurações úteis
    verbose: true,
    testTimeout: 10000,
    maxWorkers: '50%',
};
