const { format, createLogger, transports, Logform} = require('winston')
const { timestamp, combine, errors, json } = format
require('winston-daily-rotate-file');
var path = require('path');

function buildProdLogger()
{
    return createLogger({
      level: 'info',
      format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
      ),
      transports: [
        new transports.Console(),
        // new transports.File({
        // })
      ],
    });
}



module.exports = buildProdLogger