const walk = require('babylon-walk');
const t = require('babel-types');

function hasNavigationSignature(args) {
  return t.isStringLiteral(args[0]) && (
    /**
     * @todo Write a function that gets identifier's value
    */
    t.isObjectExpression(args[1]) ||
    t.isIdentifier(args[1]) ||
    typeof args === 'undefined'
  );
}

module.exports = function getTransitions(ast) {
  const transitions = [];
  const visitors = {
    CallExpression(node) {
      const args = node.arguments;
      const { callee } = node;
      const isCalledByIdentifier = (
        t.isIdentifier(callee) &&
        callee.name === 'navigate' &&
        hasNavigationSignature(args)
      );

      const isCalledByMemberExpression = (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.property) &&
        callee.property.name === 'navigate' &&
        hasNavigationSignature(args)
      );

      if (isCalledByIdentifier || isCalledByMemberExpression) {
        transitions.push(args[0].value);
      }
    },
  };

  walk.simple(ast, visitors);
  return transitions;
};
