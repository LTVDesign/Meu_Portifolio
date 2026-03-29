/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^three$': '<rootDir>/src/__tests__/__mocks__/threeMock.ts',
        '^three/examples/jsm/(.*)$': '<rootDir>/src/__tests__/__mocks__/threeMock.ts'
    },
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
    testMatch: ['**/*.{test,spec}.{ts,tsx}'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                moduleResolution: 'node',
                resolveJsonModule: true,
                isolatedModules: true,
                noEmit: true,
                baseUrl: '.',
                paths: {
                    '@/*': ['src/*'],
                    'src/*': ['src/*']
                }
            }
        }]
    },
    transformIgnorePatterns: [
        'node_modules/(?!(three)/)'
    ],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
        '!src/App.tsx',
        '!src/i18n/**',
        '!src/assets/**',
        '!src/__tests__/**'
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    }
};