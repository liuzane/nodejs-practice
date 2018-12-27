const inquirer = require('inquirer');
const fs = require("fs");

fs.readdirSync('.').forEach(function (filename){
  console.log(filename);
});

inquirer
  .prompt([
    {
      type: 'list',
      name: '女神',
      choices: [ '赵丽颖', '刘亦菲', '刘诗诗', '柳岩' ],
    }
  ])
  .then(answers => {
    console.log(answers);
  });