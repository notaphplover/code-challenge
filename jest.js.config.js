const { getJestJsProjectConfig } = require('./jest.config.base');

const jsUnitProject = getJestJsProjectConfig('Unit', ['/node_modules', '.int.spec.js'], '.spec.js');

const jsIntegrationProject = getJestJsProjectConfig('Integration', ['/node_modules'], '.int.spec.js');

module.exports = {
  projects: [jsIntegrationProject, jsUnitProject],
};
