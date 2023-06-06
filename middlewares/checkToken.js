const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')
// 声明中间件，检测token
module.exports = (req, res, next) => {
  // 校验token
  let token = req.get('token')
  if (!token) {
    return res.json({
      code: -1,
      msg: 'token丢失',
      data: null,
    })
  }

  jwt.verify(req.headers.token, SECRET, (err, data) => {
    if (err) {
      return res.json({
        code: -1,
        msg: 'token 校验失败',
        data: null,
      })
    }
    // 保存用户信息
    req.user = data
    next()
  })
}
