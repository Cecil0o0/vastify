/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 15:38:23
 * @Description 微服务注册方法
 */
const defaultConf = require('../config')['serverR&D']
const { ObjectDeepSet, isString } = require('../helper/utils')
const Consul = require('consul')
const { generateServiceName, generateCheckHttp } = require('../helper/consul')
const logger = new (require('./logger'))().generateLogger()

// 注册服务

function register({ consulServer = {}, bizService = {} } = {}) {
  if (!bizService.name && isString(bizService.name)) throw new Error('name is invalid!')
  if (bizService.port !== +bizService.port) throw new Error('port is invalid!')
  if (!bizService.host && isString(bizService.host)) throw new Error('host is invalid!')
  if (!bizService.meta.$$version) throw new Error('meta.$$version is invalid!')
  if (!bizService.meta.$$microservicePort) throw new Error('meta.$$microservicePort is invalid!')
  const consul = Consul(ObjectDeepSet(defaultConf.consulServer, consulServer))
  const service = defaultConf.bizService
  service.name = generateServiceName(bizService.name)
  service.id = service.name
  service.address = bizService.host
  service.port = bizService.port
  service.check.http = generateCheckHttp(bizService.host, bizService.port)
  service.check.notes = JSON.stringify(bizService.meta)

  return new Promise((resolve, reject) => {
    consul.agent.service.list().then(services => {
      // 检查主机+端口是否已被占用
      Object.keys(services).some(key => {
        if (services[key].Address === service.address && services[key].Port === service.port) {
          throw new Error(`该服务集群endpoint[${service.address}, ${service.port}]已被占用！`)
        }
      })
      // 注册集群服务
      consul.agent.service.register(service).then(() => {
        logger.info(`${bizService.name}服务已成功注册！`)
        resolve(services)
      }).catch(err => {
        throw new Error(err)
      })
    }).catch(err => {
      throw new Error(err)
    })
  })
}

module.exports = class ServerRegister {
  constructor() {
    this.register = register
  }
}
