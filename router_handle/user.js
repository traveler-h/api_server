const db = require('../db/index')
const bcrypt = require('bcryptjs')
exports.reguser = (req, res) => {
    const data = req.body
    // 对表单中的数据进行合法性的校验
    if (!data.name || !data.password) {
        return res.cc('用户名或密码不合法')
    }
    const selSqlStr = 'select * from test_db.persons where name=?'
    const inSqlStr = 'insert into test_db.persons (name, password) values (?,?)'
    db.query(selSqlStr, [data.name], (err, result) => {
        if (err) return  res.cc(err)
        if (result.length > 0) return res.cc('用户名已被占用，请更换用户名' )
        // 用户名可用
        data.password = bcrypt.hashSync(data.password, 10)
        db.query(inSqlStr, [data.name, data.password], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('注册用户失败， 请稍后再试' )
            res.cc('注册成功', 0)
        })
    })
}

exports.login =  (req, res) => {
    res.send('登录')
}