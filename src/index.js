/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-02 13:52:12
 * @Description 入口文件
 */

'use strict'

const Engine = require('./engine')
const Tools = require('./tools')
const Plugins = require('./plugins')

module.exports = {
  ...Engine,
  // 以下对象单独实例化是因为考虑到业务代码中可能会**单独**使用
  ...Tools,
  // 框架内置插件
  Plugins
}
