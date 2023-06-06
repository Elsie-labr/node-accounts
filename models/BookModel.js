const mongoose = require('mongoose')

// 创建文档的结构对象
let BookSchema = new mongoose.Schema({
  name: String,
  auther: String,
  price: Number,
})

// 创建模型对象 对文档操作的封装对象
let BookModel = mongoose.model('books', BookSchema)

module.exports = BookModel
