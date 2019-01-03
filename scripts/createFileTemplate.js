#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const fs = require("fs");
const program = require('commander');

async function chooseDirectory(choices) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: '目录',
      choices,
    }
  ]);

  console.log(answers, 13);
}
// setTimeout(chooseDirectory, 100, [ 1, 2, 3 ]);
//
// chooseDirectory([ 4, 5, 6 ]);

fs.readdir(process.cwd() + '/src', 'utf8', (error, files) => {
  files = files.filter(filename => /^((?!\.).)*$/g.test(filename));

  chooseDirectory([ 'a', 'b', 'c' ]);

  chooseDirectory([ 'd', 'e', 'f' ]);
});