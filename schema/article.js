// 导入定义验证规则的包
const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().required()

exports.reg_addcate_schema = {
    body: {
        name,
        alias
    }
}