/**
 * @author Cecil
 * @description 该模块输出高级队列实例，比如rabbitmq、rocketmq等等
 */

'use strict'

const amqp = require('amqplib')
const config = require('./config')

let resolveHandler = null
let rejectHandler = null

let getChannel = new Promise((resolve, reject) => {
  resolveHandler = resolve
  rejectHandler = reject
})

amqp.connect(config.amqpAddr, (err, conn) => {
  conn.createChannel((err, ch) => {
    ch ? resolveHandler(ch) : rejectHandler(err)
  })
})

module.exports = getChannel