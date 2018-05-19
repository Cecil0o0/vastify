const options = process.env.NODE_ENV === 'production' ? require('./prod') : process.env.NODE_ENV === 'test' ? require('./test') : require('./dev')

module.exports = options