const getComponentName = require('./getComponentName');
const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const babylonConfig = require('./babylon.conf');

function getAST(filename) {
  const fileContent = fs.readFileSync(filename, 'utf8');
  return babylon.parse(fileContent, babylonConfig);
}

describe('getComponentName with various input sources', () => {
  it('export default class X extends Y {}', () => {
    const filename = path.join(__dirname, 'fixtures/exportDefaultClass.js');
    const name = getComponentName(getAST(filename));
    expect(name).toBe('Foo');
  });

  it('export default Foo', () => {
    const filename = path.join(__dirname, 'fixtures/exportDefaultIdentifier.js');
    const name = getComponentName(getAST(filename));
    expect(name).toBe('Foo');
  });

  it('export default function Foo() {}', () => {
    const filename = path.join(__dirname, 'fixtures/exportDefaultStateless.js');
    const name = getComponentName(getAST(filename));
    expect(name).toBe('Foo');
  });

  it('export default function Foo() {} (without requiring React)', () => {
    const filename = path.join(__dirname, 'fixtures/exportDefaultReactless.js');
    const name = getComponentName(getAST(filename));
    expect(name).toBe(null);
  });
});
