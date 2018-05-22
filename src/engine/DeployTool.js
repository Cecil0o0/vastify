/**
 * @author Cecil
 * @description 该模块输出自动化部署配置实例，用pm2
 */

'use strict'

const config = require('../config')

function GeneratePM2AppConfig({ name = '', script = '', error_file = '', out_file = '', exec_mode = 'fork', instances = 1 }) {
  if (name) {
    return Object.assign({
      name,
      script: script || `${name}.js`,
      error_file: error_file || `${name}-err.log`,
      out_file: out_file|| `${name}-out.log`,
      instances,
      exec_mode: instances > 1 ? 'cluster' : 'fork'
    }, config.pm2.app)
  } else {
    return null
  }
}

function GeneratePM2DeployConfig({ ref = '', repo = '', path = '' } = {}) {
  return Object.assign({
    ref,
    repo,
    path
  }, config.pm2.deploy)
}

module.exports = class DeployTool {
  constructor() {
    this.GeneratePM2AppConfig = GeneratePM2AppConfig
    this.GeneratePM2DeployConfig = GeneratePM2DeployConfig
  }
}
