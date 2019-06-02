const { createLogger, format, transports } = require('winston');
const moment = require('moment');
const path = require('path');

const { printf } = format;

const log = createLogger({
  format: printf(info => `[${moment().format('DD-MM-YYYY HH:mm:ssZ')}] [${info.level}]: ${info.message}`),
  transports: [
    new transports.File({ filename: `${path.join(__dirname, '..', 'data', 'winston')}/{{name}}.log` }),
    new transports.Console()
  ]
});

module.exports = log;
