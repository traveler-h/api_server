const express = require('express');
const router = express.Router()
const handleUserInfo = require('../router_handle/userinfo')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_update_schema, reg_updatepwd_schema, reg_update_avatar_schema } = require('../schema/user')

router.get('/userinfo', handleUserInfo.getUserInfo)
router.post('/updateuser', expressJoi(reg_update_schema), handleUserInfo.updateUserInfo)
router.post('/updatepwd', expressJoi(reg_updatepwd_schema), handleUserInfo.updatePassword)
router.post('/update/avatar', expressJoi(reg_update_avatar_schema), handleUserInfo.updateAvatar)

module.exports = router