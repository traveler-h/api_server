// 导入定义验证规则的包
const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()

// 分别定义 标题、分类Id、内容、发布状态的校验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}

exports.reg_addcate_schema = {
    body: {
        name,
        alias
    }
}
exports.reg_updatecate_schema = {
    body: {
        name,
        alias,
        id
    }
}

exports.reg_delcate_schema = {
    params: {
        id
    }
}

exports.reg_getcate_schema = {
    params: {
        id
    }
}