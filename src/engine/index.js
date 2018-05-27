/**
 * @author Cecil
 * @description 引擎入口文件
 */
'use strict'

let config = require('../config')
const Seneca = require('seneca')
const Web = require('./Web')
const DeployTool = require('./DeployTool')
const Logger = require('./Logger')
const { ObjectDeepSet } = require('../helper/utils')
const DB = require('./DB')

class Vastify {
  constructor (externalConfig = {}) {
    this.config = config
    ObjectDeepSet(this.config, externalConfig)
    // 微服务核心组件
    this.seneca = new Seneca(this.config.seneca)
    // 微服务对外提供http服务组件
    this.web = new Web()
    // 提供http服务扩展
    this.web.externalUseREST(this.seneca)
    // pm2自动化部署相关工具
    this.DeployTool = new DeployTool()
    // 日志组件
    this.Logger = new Logger(this.config.logger)
    // 持久化存储组件
    this.DB = new DB(this.config.db)
  }
}

module.exports = Vastify

console.log(Object.assign(new Vastify()))
