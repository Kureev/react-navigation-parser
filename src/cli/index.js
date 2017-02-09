const path = require('path');
const parse = require('../parser');

const args = process.argv.slice(2);
const projectRoot = path.resolve(__dirname, args[0]);

const results = parse(projectRoot);

results.forEach(({ file, routes }) => {
  console.log(`\n\nFile ${file} has following routes:`);
  routes.forEach(route => console.log(route));
});
