/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 15:41:59
 * @Description 内置http路由服务
 */
'use strict'

const Consul = require('consul')
const defaultConf = require('../config')
const Seneca = require('seneca')
const { ObjectDeepSet } = require('../helper/utils')
const logger = new (require('../tools/logger'))().generateLogger()
const Web = require('../engine/web')

const seneca = new Seneca(ObjectDeepSet(defaultConf.seneca, {
  tag: 'routing-server'
}))
let consul = null
let services = {}

function syncCheckList () {
  return new Promise((resolve, reject) => {
    consul.agent.service.list().then(allServices => {
      if (Object.keys(allServices).length > 0) {
        services = allServices
        consul.agent.check.list().then(checks => {
          Object.keys(checks).forEach(key => {
            allServices[key.replace('service:', '')]['check'] = checks[key]
          })
          console.log(services)
          resolve(services)
        }).catch(err => {
          throw new Error(err)
        })
      } else {
        const errmsg = '未发现可用服务'
        logger.warn(errmsg)
        throw new Error(errmsg)
      }
    }).catch(err => {
      throw new Error(err)
    })
  })
}

function start(consulServer) {

  consul = Consul(ObjectDeepSet(defaultConf['serverR&D'].consulServer, consulServer))
  syncCheckList().then(() => {
    seneca.add({
      $$action: 'routing',
      timeout$: defaultConf.microservice.requestTimeout
    }, (msg, done) => {
      const { $$target, $$version } = msg
    })

    startTimeInterval()
  })
}

function startTimeInterval() {
  setInterval(syncCheckList, defaultConf.routing.servicesRefresh)
}

start()

module.exports = start
