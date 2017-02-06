const babylon = require('babylon');
const t = require('babel-types');
const filterByImportSource = require('../utils/filterByImportSource');
const babylonConfig = require('./babylon.conf');

module.exports = function isNavigationContainer(fileContent) {
  return babylon.parse(fileContent, babylonConfig)
    .program.body
    .filter(t.isImportDeclaration)
    .filter(filterByImportSource('react-navigation'))
    .length > 0;
};
