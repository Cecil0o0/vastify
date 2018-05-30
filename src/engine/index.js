/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 01:56:13
 * @Description 引擎入口文件
 */
'use strict'

let config = require('../config')
const Seneca = require('seneca')
const HealthCheckWebModule = require('./health-check')
const Web = require('./Web')
const DB = require('./db-client')
const { ObjectDeepSet } = require('../helper/utils')

let instance = null

function getIntance(externalConfig = {}) {
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
    // 持久化存储组件
    instance.db = DB.getInstance(instance.config.db)
    // 初始化路由服务
    RoutingServer()
    // 初始化健康查询接口
    instance.seneca.useREST(HealthCheckWebModule)
  }
  return instance
}

module.exports = {
  getIntance
}
