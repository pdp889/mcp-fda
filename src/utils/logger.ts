import winston from 'winston';
import path from 'path';

// Get log path from environment or use default
const logPath = process.env.FDA_LOG_PATH || path.join(process.cwd(), 'logs', 'app.log');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [new winston.transports.File({ filename: logPath })],
});

export { logger };
