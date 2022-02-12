const { getJestTsProjectConfig } = require('./jest.config.base');

const tsUnitProject = getJestTsProjectConfig('Unit', ['/node_modules', '.int.spec.ts'], '.spec.ts');

const tsIntegrationProject = getJestTsProjectConfig('Integration', ['/node_modules'], '.int.spec.ts');

module.exports = {
  projects: [tsIntegrationProject, tsUnitProject],
};
