const { createLogger, format, transports } = require('winston');

var options = {
  from: new Date() - 48 * 60 * 60 * 1000,//2 day
  until: new Date(),
  limit: 10,
  start: 0,
  order: 'desc',
  fields: ['meta', 'timestamp'],
};
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: './info-11-12.log',// change to the desire log file
    }),
  ],
});
logger.query(options, function (err, results) {
  if (err) {
    throw err;
  }
  //results = results.file.filter((result) => result.meta.method === 'GET');
  console.log(results);
});
