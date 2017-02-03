const babylon = require('babylon');

function filterByNodeType(type) {
  return node => node.type === type;
}

function filterByImportSource(sourceName) {
  return node => node.source.value === sourceName;
}

module.exports = function isEntryPoint(fileContent) {
  const ast = babylon.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'flow', 'objectRestSpread'],
  });
  const nodes = ast.program.body;

  const hasNavigationImport = nodes
    .filter(filterByNodeType('ImportDeclaration'))
    .filter(filterByImportSource('react-navigation'))
    .length === 1;

  return hasNavigationImport;
};
