const t = require('babel-types');

module.exports = function resolveRoute(route, ast) {
  /**
   * Resolved is a final shape route.
   * - `name` reflects the route name,
   * - `value` corresponds to the screen require path. Sometimes,
   * if screen is declared inside the container itself,
   * value is an empty string
   */
  const resolved = {
    name: route.key.name,
    value: '',
  };
  /**
   * Every route may have multiple keys like description, screen etc.
   * We're interested only in the value of the `screen` field.
   */
  let screenName = '';
  route.value.properties.forEach((prop) => {
    if (prop.key.name === 'screen') {
      screenName = prop.value.name;
    }
  });

  /**
   * Once we have a screen name, we look for it in file's import declarations
   */
  const imports = ast.program.body.filter(t.isImportDeclaration);
  imports.forEach((i) => {
    const matches = i.specifiers
      .filter(({ local }) => local.name === screenName);

    /**
     * If we found a specifier that corresponds to the screen name,
     * write it to the `resolved` object and return it back to the callee
     */
    if (matches.length > 0) {
      resolved.value = i.source.value;
    }
  });

  return resolved;
};
