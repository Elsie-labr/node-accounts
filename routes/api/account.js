var express = require('express')
var router = express.Router()

const moment = require('moment')
const AccountModel = require('../../models/AccountModel')
const checkToken = require('../../middlewares/checkToken')
// 记账本列表
router.get('/account', checkToken, function (req, res, next) {
  // 获取所有的账单信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        return res.json({
          code: -1,
          msg: '查询失败',
          data: null,
        })
      }
      res.json({
        code: 0,
        msg: '查询成功',
        data: data,
      })
    })
})

// 新增记录
router.post('/account', checkToken, (req, res) => {
  // 插入数据库
  AccountModel.create(
    {
      ...req.body,
      // 修改time
      time: moment(req.body.time).toDate(),
    },
    (err, data) => {
      if (err) {
        return res.json({
          code: -1,
          msg: '添加失败',
          data: null,
        })
      }
      res.json({
        code: 0,
        msg: '添加成功',
        data: data,
      })
      //   res.render('success', { msg: '添加成功哦', url: '/account' })
    }
  )
})

// 删除记录
router.delete('/account/:id', checkToken, (req, res) => {
  // 获取params
  let id = req.params.id

  console.log(id)
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      return res.json({
        code: -1,
        msg: '删除失败',
        data: err,
      })
    }
    // 提醒
    res.json({
      code: 0,
      msg: '删除成功',
      data: {},
    })
    // res.render('success', { msg: '删除成功哦', url: '/account' })
  })
})

// 查询单条账单信息
router.get('/account/:id', checkToken, (req, res) => {
  // 获取id参数
  let { id } = req.params
  // 查询数据库
  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        code: -1,
        msg: '查询失败',
        data: err,
      })
    }

    res.json({
      code: 0,
      msg: '查询成功',
      data: data,
    })
  })
})

// 更新账单
router.patch('/account/:id', checkToken, (req, res) => {
  const { id } = req.params
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      return res.json({
        code: -1,
        msg: '更新失败',
        data: err,
      })
    }

    AccountModel.findById(id, (err, data) => {
      if (err) {
        return res.json({
          code: -1,
          msg: '更新失败',
          data: err,
        })
      }

      res.json({
        code: 0,
        msg: '更新失败',
        data: data,
      })
    })
  })
})

module.exports = router
