const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Change to 'debug' if you want more detailed logging
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }) // Logs to a file
  ],
});


module.exports = logger;