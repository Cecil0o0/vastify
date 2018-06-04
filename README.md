# Vastify

a lightweight nodejs microservices framework

# FEATURES

- 模式匹配做服务间调用：略微不同于SpringCloud服务发现（http协议、IP + PORT模式），它使用更加灵活的模式匹配（Patrun模块）原则去进行微服务间的调用
- 接入koa2对C端提供RESTFUl API
- 插件：更灵活编写小而微的可复用模块
- seneca内置日志输出
- 第三方日志库比较winston（选用）、bunyan、log4js
- RabbitMQ消息队列
- PM2：node服务部署（服务集群）、管理与监控
- PM2：自动化部署
- PM2集成docker
- 请求追踪（重建用户请求流程）
- 梳理Consul 服务注册与发现基本逻辑
- 框架集成node-consul
- mongodb持久化存储
- 结合seneca与consul的路由服务中间件（可支持多个相同名字服务集群路由，通过$$version区别）
- 支持流处理（文件上传/下载等）
- jenkins自动化部署
- nginx负载均衡
- 持续集成方案
- redis缓存
- prisma提供GraphQL接口

[Introduction](https://blog.qingf.me/?p=734)
