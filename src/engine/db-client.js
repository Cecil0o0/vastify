/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 10:07:08
 * @Description mongodb实例
 */

'use strict'

const mongoose = require('mongoose')

let instance = null

function getInstance(DBConfig = {}) {
  if (!instance) {
    mongoose.connect(DBConfig.address || 'mongodb://localhost:27017')

    instance = mongoose.connection
    instance.on('error', console.error.bind(console, 'mongoose connection error:'))
    instance.once('open', function() {
      console.log('mongoose connection opened')
    })
    instance.on('connected', () => {
      console.log('mongoose connection connected')
    })
    instance.on('disconnected', () => {
      if (DBConfig.FatalIfNotConnected) {
        throw new Error('mongodb未连接')
        process.exit(1)
      } else {
        console.log('mongodb未连接')
      }
    })
  }
  return instance
}

module.exports = {
  getInstance
}
