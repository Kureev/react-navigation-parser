const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const getRoutes = require('./getRoutes');
const isNavigationContainer = require('./isNavigationContainer');

module.exports = function parse(projectRoot, options = {}) {
  let cmd = `find ${projectRoot} -name "*.js" -not -path "*node_modules*"`;
  if (options.exclude && Array.isArray(options.exclude)) {
    cmd += options.exclude
      .reduce((acc, x) => (acc.push(` -not -path "${x}"`) && acc), [])
      .join('');
  }

  const jsFiles = exec(cmd, { encoding: 'utf8' })
    .split('\n')
    .filter(f => f);

  const results = [];

  jsFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const isContainer = isNavigationContainer(fileContent);
    if (isContainer) {
      const routes = getRoutes(fileContent)
        .map(({ name, value }) => {
          const resolvedValue = path.resolve(path.dirname(file), value);
          return { name, value: `${resolvedValue}.js` };
        });
      results.push({ file, routes });
    }
  });

  return results;
};
