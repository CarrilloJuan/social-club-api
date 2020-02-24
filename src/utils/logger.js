import { createLogger, format, transports } from 'winston';
import appRoot from 'app-root-path';
import config from '../config';

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || 'debug';

function formatParams(info) {
  let infoMessage;
  const { timestamp, level, message } = info;
  if (typeof message === 'object') {
    const { ctx, entity, errorCode } = message;
    infoMessage = `${ctx}: ${entity} ${errorCode}`;
  }
  infoMessage = message;
  const log = `${timestamp} ${level}: ${infoMessage}`;
  return info.stack ? `${log} \n ${info.stack}` : log;
}

const developmentFormat = format.combine(
  format.colorize(),
  format.errors({ stack: true }),
  format.timestamp(),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.printf(formatParams),
);

const productionFormat = format.combine(
  format.timestamp(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.align(),
  format.printf(formatParams),
);

let logger;

if (config.env !== 'production') {
  logger = createLogger({
    level: level,
    format: developmentFormat,
    transports: [new transports.Console()],
  });
} else {
  logger = createLogger({
    level: level,
    format: productionFormat,
    transports: [
      new transports.File({
        filename: `${appRoot}/logs/errors.log`,
        level: 'error',
      }),
      new transports.File({
        filename: `${appRoot}/logs/combined.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;
