/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 10:02:35
 * @Description 该模块输出自动化部署配置实例生成器，用pm2
 */

'use strict'

const defaultConfig = require('../config').pm2

function GeneratePM2AppConfig({ name = '', script = '', error_file = '', out_file = '', exec_mode = 'fork', instances = 1 }) {
  if (name) {
    return Object.assign(defaultConfig.app, {
      name,
      script: script || `${name}.js`,
      error_file: error_file || `${name}-err.log`,
      out_file: out_file|| `${name}-out.log`,
      instances,
      exec_mode: instances > 1 ? 'cluster' : 'fork'
    })
  } else {
    throw new Error('创建pm2 app config时必须传入应用名称')
    return null
  }
}

function GeneratePM2DeployConfig({ name = '', user = 'deploy', host = '', ref = 'remotes/origin/master', repo = '', path = '', env = {} } = {}) {
  if (user && host && repo && path) {
    return Object.assign(defaultConfig.deploy, {
      user,
      host,
      ref,
      repo,
      path,
      env
    })
  } else {
    throw new Error('创建pm2 deploy config时必须传入user,host,repo,path')
    return null
  }
}

module.exports = class DeployTool {
  constructor() {
    this.GeneratePM2AppConfig = GeneratePM2AppConfig
    this.GeneratePM2DeployConfig = GeneratePM2DeployConfig
  }
}
