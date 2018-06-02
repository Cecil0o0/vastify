/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-31 21:57:27
 * @Description 框架默认配置文件
 */

'use strict'

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {

  microservice: {
    healthCheckReturn: {
      version: 'default'
    },
    requestTimeout: '5s'
  },

  routing: {
    servicesRefresh: 12000
  },

  seneca: {
    // seneca启动超时时间
    timeout: 5000,
    // 日志
    log: {
      level: 'info',
      short: !isProduction
    },
    // 微服务唯一标识
    tag: 'micro1000',
    // 追踪
    trace: {
      act: true,
      stack: true
    },
    debug: {
      // 当设置为true时，如软件运行中throw new Error()软件不会挂掉
      undead: isProduction
    }
  },

  ampq: {
    type: 'rabbitmq',
    address: 'amqp://localhost'
  },

  cache: {
    type: 'reddis',
    address: ''
  },

  db: {
    type: 'mongodb',
    version: 'v3.4.9',
    address: 'mongodb://localhost:27017',
    FatalIfNotConnected: true
  },

  pm2: {
    app: {
      args: '',
      max_memory_restart: '150M',
      // 默认环境配置
      env: {
        NODE_ENV: 'development'
      },
      // 测试环境配置
      env_test: {
        NODE_ENV: 'test'
      },
      // 生产环境配置
      env_production: {
        NODE_ENV: 'production'
      },
      // source map
      source_map_support: true,
      // 不合并日志输出，用于集群服务
      merge_logs: false,
      // 常用于启动应用时异常，超时时间限制
      listen_timeout: 5000,
      // 进程SIGINT命令时间限制，即进程必须在监听到SIGINT信号后必须在以下设置时间结束进程
      kill_timeout: 2000,
      // 当启动异常后不尝试重启，运维人员尝试找原因后重试
      autorestart: false,
      // 不允许以相同脚本启动进程
      force: false,
      // 在Keymetrics dashboard中执行pull/upgrade操作后执行的命令队列
      post_update: ['npm install'],
      // 监听文件变化
      watch: false,
      // 忽略监听文件变化
      ignore_watch: ['node_modules']
    },
    deploy: {
      'user': 'deploy',
      'host': 'qingf.me',
      'ref': 'remotes/origin/master',
      'repo': 'https://github.com/Cecil0o0/account-server.git',
      'path': '/home/deploy/apps/account-server',
      // 生命周期钩子，在ssh到远端之后setup操作之前执行
      'pre-setup': '',
      // 生命周期钩子，在初始化设置即git pull之后执行
      'post-setup': 'ls -la',
      // 生命周期钩子，在远端git fetch origin之前执行
      'pre-setup': '',
      // 生命周期钩子，在远端git修改HEAD指针到指定ref之后执行
      'post-deploy': 'npm install && pm2 startOrRestart deploy/ecosystem.config.js --env production',
      // 以下这个环境变量将注入到所有app中
      "env": {
        "NODE_ENV": "production"
      }
    }
  },

  logger: {
    winston: {
      level: 'info',
      label: 'microservices',
      format: info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
      }
    }
  },

  // 服务注册与发现
  // https://github.com/silas/node-consul#catalog-node-services
  'serverR&D': {
    consulServer: {
      type: 'consul',
      host: '127.0.0.1',
      port: 8500,
      secure: false,
      ca: [],
      defaults: {
        token: ''
      },
      promisify: true
    },
    bizService: {
      name: 'defaultName',
      id: 'defaultId',
      address: '127.0.0.1',
      port: 1000,
      tags: [],
      meta: {
        version: '',
        description: '注册集群'
      },
      check: {
        // 用于consul client主动请求consul server，如果设定时间内未更新check则失效(ex: 60s)，这里由于我们的业务服务统一用pm2做集群处理，所以考虑到集群主动请求的效率较低，这里还是采用http形式
        // ttl: '15s',
        http: '',
        // check间隔时间(ex: 15s)
        interval: '10s',
        // check超时时间(ex: 10s)
        timeout: '2s',
        // 处于临界状态后自动注销服务的超时时间
        deregistercriticalserviceafter: '30s',
        // 初始化状态值为成功
        status: 'passing',
        // 备注
        notes: '{"version":"111","microservice-port":1115}'
      }
    }
  }
}
