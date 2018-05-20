/**
 * @author Cecil
 * @description 引擎入口文件
 */
'use strict'

let config = require('../config')
const Seneca = require('seneca')
const web = require('./web')
const Deploy = require('./Deploy')
const generateUseREST = require('./useREST')
const logger = require('./logger')
const { ObjectDeepSet } = require('../helper/utils')

let vast = null

class Vast {
  constructor (externalConfig = {}) {
    this.config = config
    ObjectDeepSet(this.config, externalConfig)
    this.init(this.config)
  }

  init (config) {
    this.seneca = new Seneca(config.seneca)
    this.useREST = generateUseREST(this.seneca)
    this.web = web
    this.logger = logger
    this.deploy = new Deploy()
  }
}

module.exports = Vast
