module.exports = {
  // seneca微服务相关 -----start
  seneca: {
    // seneca启动超时时间
    timeout: 10000,
    // 日志
    log: {
      level: false,
      short: false
    },
    // 微服务唯一标识
    tag: `account-server&&1001`,
    // 追踪
    trace: {
      act: true,
      stack: true
    },
    debug: {
      // 当设置为true时，如软件运行中throw new Error()软件不会挂掉
      undead: false
    }
  },
  // seneca微服务相关 -----end
  // rabbitmq队列相关 -----start
  ampq: {
    addr: 'amqp://localhost'
  },
  // rabbitmq队列相关 -----end
  // cache相关 -----start
  cache: {
    type: 'nuster'
  },
  // cache相关 -----end
  // db相关 -----start
  db: {
    type: 'mongodb'
  },
  // db相关 -----end
  // pm2相关 -----start
  pm2: {
    deploy: {
      max_memory_restart: '150M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      // source map
      source_map_support: true,
      // 不合并日志输出，用于集群服务
      merge_logs: false,
      // 常用于启动应用时异常
      listen_timeout: 5000,
      // 进程SIGINT命令时间限制，即进程必须在监听到SIGINT信号后必须在以下设置时间结束进程
      kill_timeout: 2000,
      // 当启动异常后不尝试重启，运维人员尝试找原因后重试
      autorestart: false,
      // 不允许以相同脚本启动进程
      force: false,
      // 在Keymetrics dashboard中执行pull/upgrade操作后执行的命令队列
      post_update: ['npm install']
    }
  }
  // pm2相关 -----end
}
