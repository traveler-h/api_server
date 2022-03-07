const express = require('express');
const router = express.Router()
const handleUserInfo = require('../router_handle/userinfo')

router.get('/userinfo', handleUserInfo.getUserInfo)

module.exports = router