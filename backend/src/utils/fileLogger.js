const winston = require('winston');
require('winston-daily-rotate-file');

const infoRotateTransport = new winston.transports.DailyRotateFile({
  frequency: '6h', // rotate by time
  filename: './log/info-%DATE%.log',
  datePattern: 'DD-HH', // relevantly rotate by time
  maxSize: '1m', //rotate by file size
  maxFiles: '14', // rotate by file number
});
const errorRotateTransport = new winston.transports.DailyRotateFile({
  frequency: '6h', // rotate by time
  filename: './log/error-%DATE%.log',
  datePattern: 'DD-HH', // relevantly rotate by time
  maxSize: '1m', //rotate by file size
  maxFiles: '14', // rotate by file number
});
const infoLogger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [infoRotateTransport],
});
const errorLogger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [errorRotateTransport],
});
module.exports = {
  infoLogger,
  errorLogger,
};
