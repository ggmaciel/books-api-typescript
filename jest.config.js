const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
    clearMocks: true,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
    testMatch: ['<rootDir>/src/**/*.test.ts']
}
