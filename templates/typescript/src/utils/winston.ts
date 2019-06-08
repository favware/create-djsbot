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
 * import log from '@utils/winston'
 * log.info('your info log message');
 * log.error('your error log message');
 * ```
 */

import moment from 'moment';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const { printf } = format;
const botName = '{{name}}';

export const log = createLogger({
    format: printf(info => `[${moment().format('DD-MM-YYYY HH:mm:ssZ')}] [${info.level}]: ${info.message}`),
    transports: [
        new transports.File({ filename: `${path.join(__dirname, '..', 'data', 'winston')}/${botName}.log` }),
        new transports.Console()
    ],
});

export default log;