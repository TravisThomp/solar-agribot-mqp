const { format, createLogger, transports, Logform} = require('winston')
const { timestamp, combine, errors, json } = format
require('winston-daily-rotate-file');

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
        new transports.Console()

      ],
    });
}



module.exports = buildProdLogger