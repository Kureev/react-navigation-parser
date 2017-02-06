const babylon = require('babylon');
const resolveObjectExpression = require('./resolveObjectExpression');
const babylonConfig = require('../parser/babylon.conf');

test('resolveObjectExpression() resolves nested spreads', () => {
  const code = `
    const a = {a: 1, b: 2};
    const b = {...a, c: 3};
    const c = {...b, d: 4};
  `;
  const ast = babylon.parse(code, babylonConfig);
  const objectExpression = ast.program.body[2].declarations[0].init;
  const resolved = resolveObjectExpression(objectExpression, ast);
  const keys = resolved.map(r => r.key.name);
  expect(JSON.stringify(keys)).toEqual(JSON.stringify(['a', 'b', 'c', 'd']));
});
