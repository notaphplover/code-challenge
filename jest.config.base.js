/**
 * @param { !string } projectName Jest project's name
 * @param { !Array<string> } collectCoverageFrom expressions to match to a file covered by IstambulJs
 * @param { !Array<string> } roots Jest roots
 * @param { !Array<string> } testMatch Expressions to match to test file paths
 * @param { !Array<string> } testPathIgnorePatterns Expressions to match to ignored file paths by jest
 * @returns { !import("@jest/types/build/Config").GlobalConfig } Jest config
 */
function getJestProjectConfig(
  projectName,
  collectCoverageFrom,
  roots,
  testMatch,
  testPathIgnorePatterns,
) {
  const projectConfig = {
    displayName: projectName,
    collectCoverageFrom: collectCoverageFrom,
    coveragePathIgnorePatterns: ['/node_modules/', '/fixtures/'],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: '.',
    roots: roots,
    testEnvironment: 'node',
    testMatch: testMatch,
    testPathIgnorePatterns: testPathIgnorePatterns,
  };

  return projectConfig;
}

/**
 * @param { !string } projectName Jest project's name
 * @param { !Array<string> } testPathIgnorePatterns Expressions to match to ignored file paths by jest
 * @param { ?string } extension Test extension to match
 * @returns { !import("@jest/types/build/Config").GlobalConfig } Jest config
 */
function getJestJsProjectConfig(
  projectName,
  testPathIgnorePatterns,
  extension,
) {
  const root = getJestJsProjectRoot();
  const testMatch = [getTestMatch(root, extension)];
  const collectCoverageFrom = [`${root}/**/*.js`];

  return getJestProjectConfig(
    projectName,
    collectCoverageFrom,
    [root],
    testMatch,
    testPathIgnorePatterns,
  );
}

/**
 * @returns { !string }
 */
function getJestTsProjectRoot() {
  return '<rootDir>/src';
}

/**
 * @returns { !string }
 */
function getJestJsProjectRoot() {
  return '<rootDir>/dist';
}

/**
 * @param { !string } projectName Jest project's name
 * @param { !Array<string> } testPathIgnorePatterns Expressions to match to ignored file paths by jest
 * @param { ?string } extension Test extension to match
 * @returns { !import("@jest/types/build/Config").GlobalConfig } Jest config
 */
function getJestTsProjectConfig(
  projectName,
  testPathIgnorePatterns,
  extension,
) {
  const root = getJestTsProjectRoot();
  const testMatch = [getTestMatch(root, extension)];
  const collectCoverageFrom = [`${root}/**/*.js`];

  return {
    ...getJestProjectConfig(
      projectName,
      collectCoverageFrom,
      [root],
      testMatch,
      testPathIgnorePatterns,
    ),
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
  };
}

/**
 * @param { !string } root Project root
 * @param { !string } testExtension Test extension files
 * @returns { !string }
 */
function getTestMatch(root, testExtension) {
  return `${root}/**/*${testExtension}`;
}

module.exports = { getJestJsProjectConfig, getJestTsProjectConfig };
