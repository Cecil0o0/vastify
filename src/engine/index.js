/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 10:00:06
 * @Description 引擎入口文件
 */
'use strict'

let config = require('../config')
const Seneca = require('seneca')
const HealthCheckWebModule = require('./health-check')
const Web = require('./web')
const DB = require('./db-client')
const { ObjectDeepSet } = require('../helper/utils')

let instance = null

function getInstance(externalConfig = {}) {
  if (!instance) {
    instance = {
      config
    }
    ObjectDeepSet(instance.config, externalConfig)
    // 微服务核心组件
    instance.seneca = new Seneca(instance.config.seneca)
    // 微服务对外提供http服务组件
    instance.web = Web.getInstance()
    // 提供http服务扩展
    instance.web.externalUseREST(instance.seneca)
    // 初始化健康查询接口
    HealthCheckWebModule.options = instance.config.microservice.healthCheckReturn
    instance.seneca.useREST(new instance.web.VastifyWebModule(HealthCheckWebModule))
    // 持久化存储组件
    instance.db = DB.getInstance(instance.config.db)
  }
  return instance
}

module.exports = {
  getInstance
}
