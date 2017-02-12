const getRoutes = require('./getRoutes');
const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const babylonConfig = require('./babylon.conf');

describe('getRoutes with various input sources', () => {
  it('getRoutes gets a list of app routes (object literal)', () => {
    const filename = path.join(__dirname, 'fixtures/routesByObjectLiteral.js');
    const fileContent = fs.readFileSync(filename, 'utf8');
    const ast = babylon.parse(fileContent, babylonConfig);
    const { routes } = getRoutes(ast);
    const names = routes.map(({ name }) => name);
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
    const ast = babylon.parse(fileContent, babylonConfig);
    const { routes } = getRoutes(ast);
    const names = routes.map(({ name }) => name);
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
