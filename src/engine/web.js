/**
 * @author Cecil
 * @description 该模块用于初始化web server实例，此处用koa，也可用express，fastify，restify等等
 */

'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const SenecaWebAdapterKoa = require('seneca-web-adapter-koa2')
const app = new Koa()

module.exports = {
  app,
  Router,
  SenecaWebAdapterKoa
}
