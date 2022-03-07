const express = require('express')
const userHandel = require('../router_handle/user')
const router = express.Router()
// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandel.reguser)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandel.login)


module.exports = router