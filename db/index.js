// 倒入db文件
const db = require('./db.js')
const mongoose = require('mongoose')
const BookModel = require('../models/BookModel.js')
db(
  () => {
    // 新增数据
    BookModel.create(
      {
        name: '西游记',
        auther: '吴承恩',
        price: 20,
      },
      (err, data) => {
        if (err) {
          console.log('添加失败')
          return
        }
        console.log(data)
      }
    )
  },
  () => {
    console.log('连接失败')
  }
)
