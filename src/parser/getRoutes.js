const babylon = require('babylon');
const walk = require('babylon-walk');
const t = require('babel-types');
const babylonConfig = require('./babylon.conf');
const resolveObjectExpression = require('../utils/resolveObjectExpression');
const resolveObjectIdentifier = require('../utils/resolveObjectIdentifier');

const navigatorsList = [
  'StackNavigator',
  'TabNavigator',
  'DrawerNavigator',
];

module.exports = function getRoutes(fileContent) {
  const nodes = [];
  const ast = babylon.parse(fileContent, babylonConfig);

  const visitors = {
    CallExpression(node) {
      if (navigatorsList.indexOf(node.callee.name) > -1) {
        nodes.push(node);
      }
    },
  };

  /**
   * First we walk through the file AST to find a call expression(s) that
   * creates a StackNavigator instance. (@todo Change it to all possible navigators)
   * All call expressions are collected in `nodes` array.
   */
  walk.simple(ast, visitors);

  /**
   * Once we have all call expressions in array, we can get their arguments (e.g. routes)
   * In the scope of proof of concept implementation I'll keep it simple and take only
   * the first one call expression. If it'll be needed, this code can be replaced by
   * something more generic. We also take the first argument (object / variable with routes)
   */
  const firstArg = nodes[0].arguments[0];

  /**
   * Routes can be passed as object expression or a variable. We need to handle both cases:
   */
  let resolvedRoutes;
  if (t.isObjectExpression(firstArg)) {
    resolvedRoutes = resolveObjectExpression(firstArg, ast);
  } else if (t.isIdentifier(firstArg)) {
    resolvedRoutes = resolveObjectIdentifier(firstArg, ast);
  }

  return resolvedRoutes;
};
