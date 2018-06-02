/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 13:52:06
 * @Description 微服务内置工具类
 */

'use strict'

const DeployTool = require('./deploy-tool')
const Logger = require('./logger')
const ServerRegister = require('./server-register')

module.exports = {
  // pm2自动化部署相关工具
  DeployTool: new DeployTool(),
  // 日志组件
  Logger: new Logger(),
  // 服务注册（用于pm2编程作集群注册）
  ServerRegister: new ServerRegister(),
}
