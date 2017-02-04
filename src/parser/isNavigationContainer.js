const babylon = require('babylon');
const t = require('babel-types');
const filterByImportSource = require('../utils/filterByImportSource');

const babylonConfig = {
  sourceType: 'module',
  plugins: ['jsx', 'flow', 'objectRestSpread'],
};

module.exports = function isNavigationContainer(fileContent) {
  return Boolean(
    babylon.parse(fileContent, babylonConfig)
      .program.body
      .filter(t.isImportDeclaration)
      .filter(filterByImportSource('react-navigation'))
      .length,
  );
};
