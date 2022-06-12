/* eslint-disable import/no-anonymous-default-export */
import type { Config } from 'jest';
import { defaults } from 'jest-config';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    injectGlobals: true,
    preset: 'ts-jest',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    collectCoverage: true,
    coverageDirectory: '.coverage',
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/src/pages/api/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/src/**/_app.page.{js,jsx,ts,tsx}',
      '!<rootDir>/src/**/_document.page.{js,jsx,ts,tsx}',
      '!**/*.stories.{js,jsx,ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
    },
    moduleNameMapper: {
      /* Handle CSS imports (with CSS modules)
      https://jestjs.io/docs/webpack#mocking-css-modules */
      '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',

      /* Handle image imports
      https://jestjs.io/docs/webpack#handling-static-assets */
      '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '__mocks__/fileMock.ts',
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/.next/',
      '<rootDir>/src/__tests__/',
      '!<rootDir>/src/',
    ],
    testEnvironment: 'jsdom',
    transform: {
      /* Use babel-jest to transpile tests with the next/babel preset
      https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
  };
};
