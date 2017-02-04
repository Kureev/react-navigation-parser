const getRoutes = require('./getRoutes');
const fs = require('fs');
const path = require('path');

describe('getRoutes with various input sources', () => {
  it('getRoutes gets a list of app routes (object literal)', () => {
    const filename = path.join(__dirname, 'fixtures/routesByObjectLiteral.js');
    const fileContent = fs.readFileSync(filename, 'utf8');
    const routes = getRoutes(fileContent);
    const names = routes.map(r => r.key.name);
    expect(JSON.stringify(names)).toBe(
      JSON.stringify([
        'SimpleStack',
        'SimpleTabs',
        'Drawer',
        'CustomTabs',
        'ModalStack',
        'StacksInTabs',
        'LinkStack',
        'LinkTabs',
        'Index',
      ]),
    );
  });

  it('getRoutes gets a list of app routes (identifier)', () => {
    const filename = path.join(__dirname, 'fixtures/routesByIdentifier.js');
    const fileContent = fs.readFileSync(filename, 'utf8');
    const routes = getRoutes(fileContent);
    const names = routes.map(r => r.key.name);
    expect(JSON.stringify(names)).toBe(
      JSON.stringify([
        'SimpleStack',
        'SimpleTabs',
        'Drawer',
        'CustomTabs',
        'ModalStack',
        'StacksInTabs',
        'LinkStack',
        'LinkTabs',
      ]),
    );
  });
});
