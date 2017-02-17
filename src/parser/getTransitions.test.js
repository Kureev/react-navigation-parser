const getTransitions = require('./getTransitions');
const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const babylonConfig = require('./babylon.conf');

function getAST(filename) {
  const fileContent = fs.readFileSync(filename, 'utf8');
  return babylon.parse(fileContent, babylonConfig);
}

test('getTransitions detects screen transitions', () => {
  const filename = path.join(__dirname, 'fixtures/transition.js');
  const ast = getAST(filename);
  expect(getTransitions(ast)).toEqual(['foo']);
});

test('getTransitions returns an empty array if no transitions', () => {
  const filename = path.join(__dirname, 'fixtures/routesByIdentifier.js');
  const ast = getAST(filename);
  expect(getTransitions(ast)).toEqual([]);
});
