const isEntryPoint = require('./isEntryPoint');
const fs = require('fs');
const path = require('path');

test('isEntryPoint detects an entry points correctly', () => {
  const filename = path.join(__dirname, 'fixtures/entryPoint.js');
  const fileContent = fs.readFileSync(filename, 'utf8');
  expect(isEntryPoint(fileContent)).toBe(true);
});
