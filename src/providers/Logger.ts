import { createLogger, transports, format, Logger as winstonLogger } from 'winston';

const logFormat = format.printf(
  (info) => `${info.timestamp} ${info.level}: ${info.message}`
);

class Logger {
  logger: winstonLogger;

  constructor() {
    this.logger = createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), logFormat),
        }),
      ],
    });
  }

  log(level: string, message: string) {
    this.logger.log(level, message);
  }
}

export default Logger;
