/**
 * This project uses the Winston library for logging. This is because
 * Winston has configurable logging. In the case for this project
 * it logs both to the console as well as to a file located at:
 *     src/data/logs/{{name}}.log
 *
 * You can call this logger as follows:
 *
 * @example
 * ```js
 * const log = require('./utils/winston'); // or the proper path to this file
 * log.info('your info log message');
 * log.error('your error log message');
 * ```
 */

const { createLogger, format, transports } = require('winston');
const moment = require('moment');
const path = require('path');
const pkg = require('../../package.json');

const { printf } = format;

const log = createLogger({
  format: printf(info => `[${moment().format('DD-MM-YYYY HH:mm:ssZ')}] [${info.level}]: ${info.message}`),
  transports: [
    new transports.File({ filename: `${path.join(__dirname, '..', 'data', 'winston')}/${pkg.name}.log` }),
    new transports.Console()
  ]
});

module.exports = log;
