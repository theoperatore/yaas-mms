'use strict';

const chalk = require('chalk');

function logInfo(text, ...args) {
  console.log.apply(console, [chalk.blue(text)].concat(args));
}

function logError(text, ...args) {
  console.error.apply(console, [chalk.red(text)].concat(args));
}

exports.logInfo = logInfo;
exports.logError = logError;
