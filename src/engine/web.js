/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 10:42:24
 * @Description 该模块用于初始化web server实例 框架采用koa
 */

'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const SenecaWebAdapterKoa = require('seneca-web-adapter-koa2')
const SenecaWeb = require('seneca-web')
const logger = new (require('../tools/logger'))().generateLogger()
const app = new Koa()

class VastifyWebModule {
  constructor ({ plugin, routes, options = {} }) {
    if (!plugin) throw new Error('plugin为必传参数，须符合http://senecajs.org/api/#plugin-init规范')
    if (!routes) throw new Error('routes为必传参数，须符合https://github.com/senecajs/seneca-web规范')
    // seneca插件
    this.plugin = plugin
    // seneca-web路由
    this.routes = routes
    this.options = options
  }
}

const isNormativeModule = m => {
  return m instanceof VastifyWebModule
}

const use = function (m, { context }) {
  // 初始化模块
  context.use(m.plugin, m.options)

  // 初始化seneca-web插件，并适配koa
  context.use(SenecaWeb, {
    context: Router(),
    adapter: SenecaWebAdapterKoa,
    routes: [...m.routes]
  })
}

const warnMsg = '检测到传入的模块为非标准模块，已自动忽略'

// 该方法用于koa注册路由，seneca注册模式，然后建立路由与模式之间一对一关系
const externalUseREST = seneca => {
  let useREST = function(webServiceModules) {
    if (webServiceModules instanceof Array) {
      webServiceModules.forEach(function(m) {
        if (isNormativeModule(m)) {
          use(m, {
            context: seneca
          })
        } else {
          logger.warn(warnMsg)
        }
      })
    } else if (typeof webServiceModules === 'object' && webServiceModules instanceof VastifyWebModule) {
      use(webServiceModules, {
        context: seneca
      })
    } else {
      logger.warn(warnMsg)
    }
  }.bind(seneca)

  seneca.useREST = useREST
}

class Web {
  constructor () {
    // 须配合userREST后生效
    this.app = app
    // koa-router构造器
    this.Router = Router,
    // 使用seneca插件并提供REST接口，须配合app后生效
    this.externalUseREST = externalUseREST
    // 如需对外提供http服务，所编写模块需要符合的规则
    this.VastifyWebModule = VastifyWebModule
    // seneca-web适配koa
    this.SenecaWebAdapterKoa = SenecaWebAdapterKoa
  }
}

let instance = null

function getInstance() {
  if (!instance) {
    instance = new Web()
  }
  return instance
}

module.exports = {
  getInstance
}
