/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 16:22:02
 * @Description 微服务内部路由中间件，暂不支持自定义路由匹配策略
 */

'use strict'

const Consul = require('consul')
const defaultConf = require('../config')
const { ObjectDeepSet, isNumber } = require('../helper/utils')
const { getServiceNameByServiceKey, getServiceIdByServiceKey } = require('../helper/consul')
const logger = new (require('../tools/logger'))().generateLogger()
const { IPV4_REGEX } = require('../helper/regex')

let services = {}
let consul = null

/**
 * @author Cecil0o0
 * @description 同步consul服务中心的所有可用服务以及对应check并组装成对象以方便取值
 */
function syncCheckList () {
  return new Promise((resolve, reject) => {
    consul.agent.service.list().then(allServices => {
      if (Object.keys(allServices).length > 0) {
        services = allServices
        consul.agent.check.list().then(checks => {
          Object.keys(checks).forEach(key => {
            allServices[getServiceIdByServiceKey(key)]['check'] = checks[key]
          })
          resolve(services)
        }).catch(err => {
          throw new Error(err)
        })
      } else {
        const errmsg = '未发现可用服务'
        logger.warn(errmsg)
        reject(errmsg)
      }
    }).catch(err => {
      throw new Error(err)
    })
  })
}

function syncRoutingRule(senecaInstance = {}, services = {}) {
  Object.keys(services).forEach(key => {
    let service = services[key]
    let name = getServiceNameByServiceKey(key)
    let $$addr = service.Address
    let $$microservicePort = ''
    let $$version = ''
    try {
      let base = JSON.parse(service.check.Notes)
      $$microservicePort = base.$$microservicePort
      $$version = base.$$version
    } catch (e) {
      logger.warn(`服务名为${serviceName}。该服务check.Notes为非标准JSON格式，程序已忽略。请检查服务注册方式（请确保调用ServerRegister的register来注册服务）`)
    }

    if (IPV4_REGEX.test($$addr) && isNumber($$microservicePort)) {
      if (service.check.Status === 'passing') {
        senecaInstance.client({
          host: $$addr,
          port: $$microservicePort,
          pin: {
            $$version,
            $$target: name
          }
        })
      } else {
        logger.warn(`${$$target}@${$$version || '无'}服务处于critical，因此无法使用`)
      }
    } else {
      logger.warn(`主机（${$$addr}）或微服务端口号（${$$microservicePort}）有误，请检查`)
    }
  })
}


function startTimeInterval() {
  setInterval(syncCheckList, defaultConf.routing.servicesRefresh)
}

function microRouting(consulServer) {
  var self = this
  consul = Consul(ObjectDeepSet(defaultConf['serverR&D'].consulServer, consulServer))
  syncCheckList().then(services => {
    syncRoutingRule(self, services)
  })
}

module.exports = microRouting
