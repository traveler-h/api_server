const express = require('express')
const userHandel = require('../router_handle/user')
const router = express.Router()

// 注册
router.post('/reguser', userHandel.reguser)

// 登录
router.post('/login', userHandel.login)


module.exports = router