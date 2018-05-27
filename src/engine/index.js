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

let instance = null

function getIntance (externalConfig = {}) {
  if (!instance) {
    instance = {
      config
    }
    ObjectDeepSet(instance.config, externalConfig)
    // 微服务核心组件
    instance.seneca = new Seneca(instance.config.seneca)
    // 微服务对外提供http服务组件
    instance.web = new Web()
    // 提供http服务扩展
    instance.web.externalUseREST(instance.seneca)
    // pm2自动化部署相关工具
    instance.DeployTool = new DeployTool()
    // 日志组件
    instance.logger = Logger.getInstance(instance.config.logger.winston)
    // 持久化存储组件
    instance.DB = new DB(instance.config.db)
  }
  return instance
}

getIntance()

module.exports = {
  getIntance
}
