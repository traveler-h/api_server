const express = require('express')
const app = express()

// 解决跨域
const cors = require('cors')
app.use(cors())

//配置表单解析中间件
app.use(express.urlencoded({extended: false}))

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
app.use('/api', userRouter)

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})