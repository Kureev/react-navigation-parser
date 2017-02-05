const t = require('babel-types');
const resolveSpread = require('./resolveSpread');

/**
 * Resolve object expression and return an array of object properties
 */
module.exports = function resolveObjectExpression(objectExpressionNode, ast) {
  let objectProperties = [];
  /**
   * Properties of object expression can be spreads (i.e. ...something), so
   * we need to check for them and if they exists, resolve them first.
   */
  objectExpressionNode.properties.forEach((prop) => {
    if (t.isSpreadProperty(prop)) {
      objectProperties = objectProperties.concat(resolveSpread(prop, ast));
    } else if (t.isObjectProperty(prop)) {
      objectProperties = objectProperties.concat(prop);
    } else {
      throw Error('Unrecognized object property');
    }
  });

  return objectProperties;
};
