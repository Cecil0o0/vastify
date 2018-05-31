/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 11:12:42
 * @Description 微服务提供consul健康检查接口的插件
 */

'use strict'

const Web = require('./web')
const web = Web.getInstance()
const { VastifyWebModule } = web

const moduleName = 'module:base'

const routes = [
  {
    prefix: '/health',
    pin: `${moduleName},if:*`,
    map: {
      check: {
        GET: true,
        name: ''
      }
    }
  }
]

function plugin (options = {}) {
  this.add(`${moduleName},if:check`, (msg, done) => {
    done(null, {
      version: options.version
    })
  })
}

module.exports = {
  plugin,
  routes,
  options: {}
}
