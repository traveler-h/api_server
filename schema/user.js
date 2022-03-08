// 导入定义验证规则的包
const joi = require('@hapi/joi')

// 定义用户名和密码的验证规则
const name = joi.string().alphanum().min(1).max(10).required()
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

const id = joi.number().integer().min(1).required()
const nick_name = joi.string().required()
const email = joi.string().email().required()

const oldPwd = password
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)

const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    name,
    password
  }
}

// 定义验证更新用户信息表单数据的规则对象
exports.reg_update_schema = {
  body: {
    id,
    nick_name,
    email
  }
}

exports.reg_updatepwd_schema = {
  body: {
    oldPwd,
    newPwd
  }
}
exports.reg_update_avatar_schema = {
  body: {
    avatar
  }
}