const walk = require('babylon-walk');
const t = require('babel-types');

module.exports = function resolveSpread(spreadProperty, ast) {
  let properties = [];

  // console.log(spreadProperty);

  const visitors = {
    VariableDeclaration(node) {
      node.declarations.forEach((declaration) => {
        if (declaration.id.name === spreadProperty.argument.name) {
          t.assertObjectExpression(declaration.init);
          /**
           * Theoretically, `init` may contain nested spreads, but for now
           * I don't take it into account.
           * @todo Recursively check for nested spreads
           */
          declaration.init.properties.forEach((p) => {
            if (t.isSpreadProperty(p)) {
              properties = properties.concat(resolveSpread(p, ast));
            } else {
              properties.push(p);
            }
          });
        }
      });
    },
  };

  walk.simple(ast, visitors);
  return properties;
};
