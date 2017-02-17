const babylon = require('babylon');
const walk = require('babylon-walk');
const babylonConfig = require('./babylon.conf');

module.exports = function isNavigationContainer(fileContent) {
  let isContainer = false;
  const ast = babylon.parse(fileContent, babylonConfig);

  walk.simple(ast, {
    ImportDeclaration(node) {
      if (node.source.value === 'react-navigation') {
        isContainer = true;
      }
    },
  });

  return isContainer;
};
