const db = require('../db/index')

exports.getArtCate = (req, res) => {
    const selSqlStr = 'select * from test_db.article where isdelete=0 order by id asc'
    db.query(selSqlStr, (err, result) => {
        if (err) return res.cc(err.message)
        return res.send({
            states: 0,
            message: '请求成功',
            data: result
        })
    })
}

exports.addCates = (req, res) => {
    const selSqlStr = 'select * from test_db.article where name=? or alias=?'
    db.query(selSqlStr, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err.message)
        if (result.length > 0) return res.cc('名称或别名被占用，请更换后重试')
        const inSqlStr = 'insert into test_db.article (name, alias) value (?,?)'
        db.query(inSqlStr, [req.body.name, req.body.alias], (err, result) => {
            if (err) return res.cc(err.message)
            if (result.affectedRows !== 1) return res.cc('新建文章分类失败')
            return res.cc('新建文章类别成功', 0)
        })
    })
}