/**
 * @author Cecil
 * @description 该模块输出日志实例，比如winston，bunyan或log4js
 */

'use strict'

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const w = require('../config').logger.winston

const logger = createLogger({
  level: w.level,
  format: combine(
    label({label: w.level}),
    timestamp(),
    printf(w.format)
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
