const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const selSqlStr = 'SELECT id, name, nick_name, age, gender, email FROM test_db.persons WHERE id = ? '
    db.query(selSqlStr, req.query.id, (err, result) => {
        console.log(result)
        if (err) return res.cc(err.message)
        if (result.length !== 1) return res.cc('获取用户信息失败')
        return res.send({
            status: 0,
            meaasge: '获取用户信息成功',
            data: result[0]
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const upSqlStr = "update test_db.persons set ? where id=?"
    db.query(upSqlStr, [req.body, req.body.id], (err, result) => {
        if (err) return res.cc(err.message)
        if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
        return res.cc('更新用户信息成功', 0)
    })
}

exports.updatePassword = (req, res) => {
    const selSqlStr = "select * from test_db.persons where id=?"
    db.query(selSqlStr, req.user.id, (err, result) => {
        if (err) return res.cc(err.message)
        if (result.length !== 1) return res.cc('用户不存在')
        const upPwdSqlStr = "update test_db.persons set password=? where id=?"

        // 比较用户输入的旧密码与数据库的密码是否一致
        const compareRes = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareRes) return res.cc('旧密码错误')

        // 给新密码加密
        req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(upPwdSqlStr, [req.body.newPwd, req.user.id], (err, result) => {
            if (err) return res.cc(err.message)
            if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
            return res.cc('更新用户信息成功', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const updateSqlStr = 'update test_db.persons set avatar=? where id=?'
    db.query(updateSqlStr, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err.message)
        if (result.affectedRows !== 1) return res.cc('更新失败')
        return res.cc('更新成功', 0)
    })
}