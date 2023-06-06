/**
 *
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = (success, error) => {
  const mongoose = require('mongoose')
  const { DBHOST, DBPORT, DBNAME } = require('../config/config')

  if (typeof error !== 'function') {
    error = () => {
      console.log('连接失败')
    }
  }
  // 设置strictQuery 为 true
  mongoose.set('strictQuery', true)

  // 连接mongdb服务
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

  // 设置回调
  // 设置连接成功回调 once 一次  事件回调函数只执行一次
  mongoose.connection.once('open', () => {
    success()
  })

  // 设置连接错误回调
  mongoose.connection.on('error', () => {
    error()
  })

  // 设置关闭连接回调
  mongoose.connection.on('close', () => {
    console.log('关闭连接')
  })
}
