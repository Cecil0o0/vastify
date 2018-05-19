/**
 * @author Cecil
 * @description 该模块用于koa注册路由，seneca注册模式，然后建立路由与模式之间一对一关系
 */

'use strict'

const SenecaWeb = require('seneca-web')
const { SenecaWebAdapterKoa, Router } = require('./web')

module.exports = function initUseREST (seneca) {
  let useREST = function (serviceModule) {
    // 初始化用户模块
    this.use(serviceModule.plugin)

    // 初始化seneca-web插件，并适配koa
    this.use(SenecaWeb, {
      context: Router(),
      adapter: SenecaWebAdapterKoa,
      routes: [...serviceModule.routes]
    })
  }.bind(seneca)

  seneca.useREST = useREST
}
