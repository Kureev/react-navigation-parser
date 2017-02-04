const getRoutes = require('./getRoutes');
const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, 'fixtures/entryPoint.js');
const fileContent = fs.readFileSync(filename, 'utf8');

test('getRoutes gets a list of app routes', () => {
  expect(getRoutes(fileContent)).toBe(false);
});
