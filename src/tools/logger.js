/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 01:55:47
 * @Description 该模块输出日志实例生成器，比如winston
 */

'use strict'

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const defaultWinstonConfig = require('../config').logger.winston

// highest to lowest
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}

let instance = null

function generateLogger(winstonConfig = {}) {
  if (!instance) {
    instance = createLogger({
      level: winstonConfig.level || defaultWinstonConfig.level,
      format: combine(
        label({label: winstonConfig.label || defaultWinstonConfig.label}),
        timestamp(),
        printf(winstonConfig.format || defaultWinstonConfig.format)
      ),
      transports: [ new transports.Console() ]
    })
  }
  return instance
}

module.exports = class Logger {
  constructor() {
    this.generateLogger = generateLogger
  }
}
