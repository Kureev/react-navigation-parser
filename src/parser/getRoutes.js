const babylon = require('babylon');
const t = require('babel-types');
const walk = require('babylon-walk');

function resolveObjectExpression(objectExpressionNode, ast) {
  let objectProperties = [];

  objectExpressionNode.properties.forEach((prop) => {
    if (t.isSpreadProperty(prop)) {
      const visitors = {
        VariableDeclaration(node, target) {
          node.declarations.forEach((declaration) => {
            if (declaration.id.name === prop.argument.name) {
              t.assertObjectExpression(declaration.init);
              target.push(declaration.init);
            }
          });
        },
      };

      const declarations = [];
      walk.simple(ast, visitors, declarations);
      objectProperties = objectProperties.concat(declarations[0].properties);
    } else if (t.isObjectProperty(prop)) {
      objectProperties = objectProperties.concat(prop);
    } else {
      throw Error('Unrecognized object property');
    }
  });

  return objectProperties;
}

const babylonConfig = {
  sourceType: 'module',
  plugins: ['jsx', 'flow', 'objectRestSpread'],
};

const visitors = {
  CallExpression(node, acc) {
    if (node.callee.name === 'StackNavigator') {
      acc.push(node);
    }
  },
};

module.exports = function getRoutes(fileContent) {
  const nodes = [];
  const ast = babylon.parse(fileContent, babylonConfig);

  /**
   * First we walk through the file AST to find a call expression(s) that
   * creates a StackNavigator instance. (@todo Change it to all possible navigators)
   * All call expressions are collected in `nodes` array.
   */
  walk.simple(ast, visitors, nodes);

  /**
   * Once we have all call expressions in array, we can get their arguments (e.g. routes)
   * In the scope of proof of concept implementation I'll keep it simple and take only
   * the first one call expression. If it'll be needed, this code can be replaced by
   * something more generic. We also take the first argument (object / variable with routes)
   */
  const routes = nodes[0].arguments[0];

  /**
   * Routes can be passed as object literal or a variable. We need to handle both cases:
   */
  if (t.isObjectExpression(routes)) {
    const resolvedRoutes = resolveObjectExpression(routes, ast);
    console.log(resolvedRoutes);
  }

  return false;
};
