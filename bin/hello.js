#!/usr/bin/env node

const program = require('commander');

program
    .version('2.9.6')
    .usage('<command> [options]')
    .command('init', 'generate a new project from a template')
    .command('list', 'list available official templates')
    .command('build', 'prototype a new project')
    .command('create', '(for v3 warning only)');

program.parse(process.argv);