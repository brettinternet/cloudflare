// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  clearMocks: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['node_modules', 'workers'],
  modulePaths: ['<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverageFrom: ['<rootDir>/workers/**/*.{ts,js}'],
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    kvNamespaces: ['REDIRECTS'],
  },
}

module.exports = config
