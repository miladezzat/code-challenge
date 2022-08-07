/* eslint-disable no-console */
const _ = require('lodash');
const config = require('config');
const { format } = require('winston');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const {
  combine, timestamp, json, colorize, prettyPrint, printf,
} = format;

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const dir = path.resolve('logs');

const options = {
  file: {
    level: 'debug',
    filename: `${dir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '21d',
  },
};

class Logger {
  constructor() {
    this.consoleLogger = winston.createLogger({
      exceptionHandlers: [new DailyRotateFile(options.file)],
      level: 'trace',
      levels: customLevels.levels,
      transports: [new winston.transports.Console()],
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf((info) => {
          const { timestamp: time, level, message } = info;

          return `${time} [${level}]: ${message}`;
        }),
      ),
      defaultMeta: { environment: config.get('ENVIRONMENT') },
      exitOnError: false,
    });

    this.errorLogger = winston.createLogger({
      exceptionHandlers: [new DailyRotateFile({ ...options.file, level: 'error' })],
      level: 'error',
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console(),
      ],
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        prettyPrint(),
      ),
      defaultMeta: { environment: config.get('ENVIRONMENT') },
      exitOnError: false,
    });
    winston.addColors(customLevels.colors);

    this.errorLogger.on('error', (err) => console.log('error', err));
    this.consoleLogger.on('error', (err) => console.log('error', err));
  }

  error(req, message, stackTrace) {
    const logData = {
      endPoint: !_.isEmpty(req) ? `${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}` : '',
      ip: req.ip,
      stackTrace,
      level: 'error',
      body: !_.isEmpty(req) ? req.body : '',
      query: !_.isEmpty(req) ? req.query : '',
      params: !_.isEmpty(req) ? req.params : '',
      userAgent: !_.isEmpty(req) ? req.get('x-user-agent') : '',
      user: req.user ? { username: req.user.username, role: req.user.role } : {},
    };

    if (stackTrace.response && stackTrace.response.data) {
      logData.stackTrace = JSON.stringify(stackTrace.response.data);
    }

    return this.errorLogger.error(message, logData);
  }

  info(message) {
    this.consoleLogger.info(message);
  }
}

module.exports = new Logger();
