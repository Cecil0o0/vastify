/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 09:27:54
 * @Description 微服务注册方法
 */
const defaultConf = require('../config')['serverR&D']
const uuidv4 = require('uuid/v4')
const { ObjectDeepSet, isString } = require('../helper/utils')

// 注册服务

function register({ consulServer = {}, bizService = {} } = {}) {
  if (!bizService.name && isString(bizService.name)) throw new Error('server name is invalid!')
  if (bizService.port !== +bizService.port) throw new Error('server port is invalid!')
  if (!bizService.host && isString(bizService.host)) throw new Error('server host is invalid!')
  const consul = require('consul')(ObjectDeepSet(defaultConf.consulServer, consulServer))
  const service = defaultConf.bizService
  service.name = `${bizService.name}-${uuidv4()}`
  service.id = service.name
  service.address = bizService.host
  service.port = bizService.port
  service.check.http = `http://${service.address}:${service.port}/user`

  return new Promise((resolve, reject) => {
    consul.agent.service.list().then(res => {
      // 检查主机+端口是否已被占用
      Object.keys(res).some(key => {
        if (res[key].Address === service.address && res[key].Port === service.port) {
          throw new Error('该服务集群endpoint已被占用！')
        }
      })
      // 注册集群服务
      consul.agent.service.register(service).then(() => {
        consul.agent.service.list((err, res) => {
          if (err) throw new Error(err)
          console.log(res)
        })
        consul.agent.check.list((err, res) => {
          if (err) throw new Error(err)
          console.log(res)
        })
      }).catch(err => {
        console.log(err)
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
