import { createLogger, format, transports } from 'winston';
import path from 'path';

// Configure the logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new transports.Console(),  // Log to console
    new transports.File({ filename: path.join(__dirname, '../../logs/app.log') }), // Log to file
  ],
});

export default logger;
