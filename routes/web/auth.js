var express = require('express')
var router = express.Router()
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
router.get('/reg', (req, res) => {
  // 相应html
  res.render('auth/reg')
})
// 注册
router.post('/reg', (req, res) => {
  //获取请求提数据
  UserModel.create(
    { ...req.body, password: md5(req.body.password) },
    (err, data) => {
      if (err) {
        res.status(500).send('注册失败')
        return
      }
      res.render('success', { msg: '注册成功', url: '/login' })
    }
  )
})
// 登录
router.get('/login', (req, res) => {
  // 相应html
  res.render('auth/login')
})

// 登录
router.post('/login', (req, res) => {
  // 查询数据库
  const { username, password } = req.body
  UserModel.findOne({ username, password: md5(password) }, (err, data) => {
    if (err) {
      res.status(500).send('登录失败')
      return
    }
    if (!data) {
      return res.send('账号或密码错误')
    }
    console.log(req)
    // 写入session
    req.session.username = data.username
    req.session._id = data._id
    res.render('success', { msg: '登录成功', url: '/account' })
  })
})

router.get('/logout', (req, res) => {
  // 销毁session
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' })
  })
})

module.exports = router
