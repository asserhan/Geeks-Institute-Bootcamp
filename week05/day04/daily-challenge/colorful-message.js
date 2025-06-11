const chalk = require('chalk');

function displayColorfulMessage() {
    console.log(chalk.blue.bold('This is a colorful message!'));
    console.log(chalk.green.underline('Node.js is awesome!'));
    console.log(chalk.yellow.bgRed.bold('Daily Challenge Complete!'));
}

module.exports = displayColorfulMessage;
