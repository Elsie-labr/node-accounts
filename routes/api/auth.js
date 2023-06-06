var express = require('express')
var router = express.Router()
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config/config')
// 登录
router.post('/login', (req, res) => {
  // 查询数据库
  const { username, password } = req.body
  UserModel.findOne({ username, password: md5(password) }, (err, data) => {
    if (err) {
      return res.json({
        code: -1,
        msg: '数据库读取失败',
        data: null,
      })
    }
    if (!data) {
      return res.json({
        code: -1,
        msg: '账号或密码错误',
        data: null,
      })
    }
    let token = jwt.sign({ username: data.username, _id: data._id }, SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    })
    // 相应token
    return res.json({
      code: 0,
      msg: '登录成功',
      data: token,
    })
  })
})

router.get('/logout', (req, res) => {
  // 销毁session
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' })
  })
})

module.exports = router
