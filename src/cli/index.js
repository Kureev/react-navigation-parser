const path = require('path');
const exec = require('child_process').execSync;
const fs = require('fs');
const isNavigationContainer = require('../parser/isNavigationContainer');
const getRoutes = require('../parser/getRoutes');

const args = process.argv.slice(2);
const projectRoot = path.resolve(__dirname, args[0]);
const cmd = `find ${projectRoot} -name "*.js" -not -path "*node_modules*"`;

const list = exec(cmd, { encoding: 'utf8' })
  .split('\n')
  .filter(f => f);

const results = [];

list.forEach((file) => {
  const fileContent = fs.readFileSync(file, 'utf8');
  const isContainer = isNavigationContainer(fileContent);
  if (isContainer) {
    results.push({ file, routes: getRoutes(fileContent) });
  }
});

results.forEach(({file, routes}) => {
  console.log(`File ${file} has following routes:`);
  routes.forEach(route => console.log(` - ${route.key.name}`));
})
