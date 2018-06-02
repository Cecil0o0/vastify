/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 14:20:25
 * @Description consul相关的工具类
 */

'use strict'

const uuidv4 = require('uuid/v4')
const logger = new (require('../tools/logger'))().generateLogger()

const getServiceNameByServiceKey = function getServiceNameByServiceKey(key = '') {
  return key.replace(/service:/, '').split('@').shift()
}

const getServiceIdByServiceKey = function getServiceIdByServiceKey(key = '') {
  return key.replace(/service:/, '')
}

const generateServiceName = function generateServiceName(name = '') {
  return `${name}@${uuidv4()}`
}

const generateCheckHttp = function generateCheckHttp(host = '127.0.0.1', port = 80) {
  return `http://${host}:${port}/health`
}

module.exports = {
  getServiceNameByServiceKey,
  getServiceIdByServiceKey,
  generateServiceName,
  generateCheckHttp
}
