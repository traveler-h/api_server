const express = require('express')
const router = express.Router()
// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const {
    reg_addcate_schema,
    reg_delcate_schema,
    reg_getcate_schema,
    reg_updatecate_schema
} = require('../schema/article')


const artCateHandle = require('../router_handle/artcate')

router.get('/cate', artCateHandle.getArtCate)
router.post('/addcates', expressJoi(reg_addcate_schema), artCateHandle.addCates)
router.get('/delcates/:id', expressJoi(reg_delcate_schema), artCateHandle.delCates)
router.get('/getcates/:id', expressJoi(reg_getcate_schema), artCateHandle.getCates)
router.post('/updatecates', expressJoi(reg_updatecate_schema), artCateHandle.updateCates)

module.exports = router