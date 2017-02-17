#!/usr/bin/env node
const path = require('path');
const parse = require('../parser');

const args = process.argv.slice(2);
const projectRoot = path.resolve(process.cwd(), args[0]);

const results = parse(projectRoot);

console.log(JSON.stringify(results));
