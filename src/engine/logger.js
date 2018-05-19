/**
 * @author Cecil
 * @description 该模块输出日志实例，比如winston，bunyan或log4js
 */

'use strict'

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const logger = createLogger({
  level: 'info',
  format: combine(
    label({label: 'microservices'}),
    timestamp(),
    printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
    })
  ),
  transports: [ new transports.Console() ]
})

// highest to lowest
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}

module.exports = logger
