#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require("fs");

async function test(choices) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: '目录',
      choices,
    }
  ]);

  console.log(answers, 13);
}

fs.readdir(process.cwd(), 'utf8', (error, files) => {
  files = files.filter(filename => /^((?!\.).)*$/g.test(filename));

  test(files);
});
//     .forEach(filename => {
//   console.log(filename, 7);
// });

// inquirer
//   .prompt([
//     {
//       type: 'list',
//       name: '女神',
//       choices: [ '赵丽颖', '刘亦菲', '范冰冰', '柳岩' ],
//     }
//   ])
//   .then(answers => {
//     // console.log(answers);
//   });