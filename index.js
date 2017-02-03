const babylon = require('babylon');

const ast = babylon.parse(`
  import React from 'react';
  import {View} from 'react-native';
  import Navigation from 'react-navigation';
`, {
  sourceType: 'module',
});

const nodes = ast.program.body;

function filterImportDeclaration(node) {
  return node.type === 'ImportDeclaration';
}

function filterByImportSource(sourceName) {
  return function filterByNodeValue(node) {
    return node.source.value === sourceName;
  };
}

const hasNavigationImport = nodes
  .filter(filterImportDeclaration)
  .filter(filterByImportSource('react-navigation'))
  .length === 1;

console.log(hasNavigationImport);
