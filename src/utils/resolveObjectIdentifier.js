const walk = require('babylon-walk');
const t = require('babel-types');
/**
 * Resolve identifier and return it's value
 */
module.exports = function resolveObjectIdentifier(identifier, ast) {
  let objectProperties = [];

  const visitors = {
    VariableDeclaration(node, target) {
      node.declarations.forEach((declaration) => {
        if (declaration.id.name === identifier.name) {
          t.assertObjectExpression(declaration.init);
          /**
           * Theoretically, `init` may contain nested spreads, but for now
           * I don't take it into account.
           * @todo Recursively check for nested spreads
           */
          target.push(declaration.init);
        }
      });
    },
  };

  const declarations = [];
  walk.simple(ast, visitors, declarations);
  /**
   * We assume that nobody re-declare variables, so `declarations` will
   * always have only one element
   */
  objectProperties = objectProperties.concat(declarations[0].properties);

  return objectProperties;
};
