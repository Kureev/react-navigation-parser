const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const babylon = require('babylon');
const babylonConfig = require('./babylon.conf');
const getRoutes = require('./getRoutes');
const getComponentName = require('./getComponentName');
const getTransitions = require('./getTransitions');
const isNavigationContainer = require('./isNavigationContainer');

module.exports = function parse(projectRoot, options = {}) {
  /**
   * @todo Add support for Windows
   */
  let cmd = `find ${projectRoot} -name "*.js" -not -path "*node_modules*"`;
  if (options.exclude && Array.isArray(options.exclude)) {
    cmd += options.exclude
      .reduce((acc, x) => (acc.push(` -not -path "${x}"`) && acc), [])
      .join('');
  }

  const jsFiles = exec(cmd, { encoding: 'utf8' })
    .split('\n')
    .slice(0, -1);

  const results = {
    containers: {},
    components: {},
    routes: {},
  };
  const containers = [];

  /**
   * Read given files and check if they are navigation containers or not
   */
  jsFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const isContainer = isNavigationContainer(fileContent);
    const ast = babylon.parse(fileContent, babylonConfig);
    const component = getComponentName(ast);
    let transitions = [];
    if (component) {
      transitions = getTransitions(ast);
    }
    /**
     * If so, get container's routes and store them to the result object
     */
    if (isContainer) {
      containers.push(file);
      const routesObj = getRoutes(ast);
      const { navigationType } = routesObj;
      let { routes } = routesObj;
      routes = routes.map(({ name, value }) => {
        results.routes[name] = path.join(path.dirname(file), value) + path.extname(file);
        return { name, value: results.routes[name] };
      });
      results.containers[file] = { navigationType, routes, component, transitions };
    } else if (component) {
      results.components[file] = { component, transitions };
    }
  });

  /**
   * Once we have object with navigators and related routes,
   * we need to build a hierarchy. Some navigators can be nested,
   * so we loop over our `results` hash to check if any of the routes
   * refers to other navigator.
   */
  Object.keys(results).forEach((r) => {
    if (!results[r].routes) {
      return;
    }
    results[r].routes.forEach((route) => {
      const matches = containers.filter(c => c === route.value);
      if (matches.length) {
        if (!results[r].children) {
          results[r].children = {};
        }
        results[r].children[matches[0]] = results[matches[0]];
      }
    });
  });

  return results;
};
