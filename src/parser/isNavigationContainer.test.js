const isNavigationContainer = require('./isNavigationContainer');
const fs = require('fs');
const path = require('path');

test('isNavigationContainer detects entry points', () => {
  const filename = path.join(__dirname, 'fixtures/routesByObjectLiteral.js');
  const fileContent = fs.readFileSync(filename, 'utf8');
  expect(isNavigationContainer(fileContent)).toBe(true);
});
