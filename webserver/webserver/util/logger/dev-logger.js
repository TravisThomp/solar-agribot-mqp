const { format, createLogger, transports, Logform} = require('winston')
const { consoleFormat } = require("winston-console-format");
const { timestamp, combine, errors, colorize, printf } = format

const myFormat = printf(({ level, message, timestamp}) =>
{
  return `[${timestamp}] ${level}: ${message}`
})

function buildDevLogger()
{
    return createLogger({
      level: 'silly',
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
        ),
        defaultMeta: { service: 'Hub' },
        transports: [
          new transports.Console({
            format: format.combine(
              format.colorize({ all:true }),
              format.padLevels(),
              consoleFormat({
                showMeta: true,
                metaStrip: ["timestamp", "service"],
                inspectOptions: {
                  depth: Infinity,
                  colors: true,
                  maxArrayLength: Infinity,
                  breakLength: 120,
                  compact: Infinity,
                }
              })
            )
          })
        ]
    });
}

module.exports = buildDevLogger