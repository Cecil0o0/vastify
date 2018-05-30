/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 01:43:54
 * @Description 微服务提供consul健康检查接口的插件
 */

'use strict'

const Web = require('./web')
const { VastifyWebModule } = new Web()

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

function plugin (version = '') {
  this.add(`${moduleName},if:check`, (msg, done) => {
    done(null, version)
  })
}

module.exports = new VastifyWebModule({
  plugin,
  routes
})
