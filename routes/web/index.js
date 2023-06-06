const express = require('express')
const router = express.Router()

const moment = require('moment')
const AccountModel = require('../../models/AccountModel')
const checkLogin = require('../../middlewares/utils')

// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向
  res.redirect('/account')
})

// 记账本列表
router.get('/account', checkLogin, function (req, res, next) {
  // 获取所有的账单信息
  //     let account = db.get('accounts').value()
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send('查询失败')
        return
      }
      res.render('list', { account: data, moment: moment })
    })
  //   res.send('账本列表')
})

// 添加记录
router.get('/account/create', checkLogin, function (req, res, next) {
  res.render('create')
  //   res.send('create')
})

// 新增记录
router.post('/account', checkLogin, (req, res) => {
  // 插入数据库
  AccountModel.create(
    {
      ...req.body,
      // 修改time
      time: moment(req.body.time).toDate(),
    },
    (err, data) => {
      if (err) {
        res.status(500).send('插入失败')
        return
      }
      res.render('success', { msg: '添加成功哦', url: '/account' })
    }
  )
})

// 删除记录
router.get('/account/:id', checkLogin, (req, res) => {
  // 获取params
  let id = req.params.id

  console.log(id)
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send('删除失败')
      return
    }
    // 提醒
    res.render('success', { msg: '删除成功哦', url: '/account' })
  })
})

module.exports = router
