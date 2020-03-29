# Vastify

> `2 years ago` 甚是感慨啊！本仓库如果没有意外将不再维护。不过如果对微服务或 Serverless 有更深的思考与感悟时会再更新 README。感谢读者们。

a lightweight nodejs microservices framework

## FEATURES

- [x]模式匹配做服务间调用：略不同于 SpringCloud 服务发现（http协议、IP + PORT模式），它使用更加灵活的模式匹配（Patrun模块）原则去进行微服务间的调用，实际上是一种 RPC 实现。
- [x]接入 koa2 对C端提供 RESTFUl API
- [x]插件：更灵活编写小而微的可复用模块
- [x]seneca 内置日志输出与第三方日志库比较 winston（选用）、bunyan、log4js
- [x]RabbitMQ 消息队列
- [x]PM2：node服务部署（服务集群）、管理与监控
- [x]PM2：自动化部署
- PM2 集成 docker~~
- K8S 做服务治理
- [x]请求追踪（重建用户请求流程）
- [x]梳理 Consul 服务注册与发现基本逻辑
- [x]框架集成 node-consul
- [x]mongodb 持久化存储
- [x]结合 seneca 与 consul 的路由服务中间件（可支持多个相同名字服务集群路由，通过 $$version 区别）
- 支持流处理（文件上传/下载等）
- jenkins 自动化部署
- [x]nginx 做应用层负载均衡
- 持续集成方案
- [x]redis 缓存
- Apollo 提供 GraphQL 接口

~~[Introduction](https://blog.qingf.me/?p=734)~~
