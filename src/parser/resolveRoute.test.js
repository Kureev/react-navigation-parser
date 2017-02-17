const resolveRoute = require('./resolveRoute');
const babylon = require('babylon');
const babylonConfig = require('./babylon.conf');

test('resolveRoute resolves screen name', () => {
  const routeNode = babylon.parse(
    '({Foo: {screen: Foo}})',
    babylonConfig,
  ).program.body[0].expression.properties[0];
  const sourceAST = babylon.parse(`
    import Foo from "X";
    import Bar from "Y";

    class Example extends React.Component {}
  `, babylonConfig);
  expect(resolveRoute(routeNode, sourceAST)).toEqual({
    name: 'Foo',
    value: 'X',
  });
});
