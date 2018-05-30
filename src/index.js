const Engine = require('./engine')
const DeployTool = require('./tools/deploy-tool')
const Logger = require('./tools/logger')
const ServerRegister = require('./tools/server-register')

require('./routing-server').start()

module.exports = {
  ...Engine,
  // 以下对象单独实例化是因为考虑到业务代码中可能会**单独**使用
  // pm2自动化部署相关工具
  DeployTool: new DeployTool(),
  // 日志组件
  Logger: new Logger(),
  // 服务注册（用于pm2编程作集群注册）
  ServerRegister: new ServerRegister()
}
