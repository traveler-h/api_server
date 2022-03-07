const express = require('express')
const app = express()
// 导入 Joi 来定义验证规则
const joi = require('@hapi/joi')

// 解决跨域
const cors = require('cors')
app.use(cors())

// 在路由之前配置全局中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({
    secret: config.jwtSercet, algorithms: ['HS256'] 
}).unless({
    path: [/^\/api\//]
}))

//配置表单解析中间件
app.use(express.urlencoded({
    extended: false
}))

// 注册全局中间件，为res注册方法， 在路由之前
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
app.use('/api', userRouter)
app.use('/my', userInfoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败的错误
    if (err.mame === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知的错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})