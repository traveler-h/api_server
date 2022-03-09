const db = require('../db/index')

exports.getArtCate = (req, res) => {
    const selSqlStr = 'select * from test_db.artcate where isdelete=0 order by id asc'
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
    const selSqlStr = 'select * from test_db.artcate where name=? or alias=?'
    db.query(selSqlStr, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err.message)
        if (result.length === 2 || result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) return res.cc('名称与别名被占用，请更换后重试')
        if (result.length === 1 && result[0].name === req.body.name) return res.cc('名称被占用，请更换后重试')
        if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('别名被占用，请更换后重试')
        const inSqlStr = 'insert into test_db.artcate (name, alias) value (?,?)'
        db.query(inSqlStr, [req.body.name, req.body.alias], (err, result) => {
            if (err) return res.cc(err.message)
            if (result.affectedRows !== 1) return res.cc('新建文章分类失败')
            return res.cc('新建文章类别成功', 0)
        })
    })
}

exports.delCates = (req, res) => {
    const updateSqlStr = 'update test_db.artcate set isdelete=1 where id=?'
    db.query(updateSqlStr, req.params.id, (err, result) => {
        if (err) return res.cc(err.message)
        if (result.affectedRows !== 1) return res.cc('删除失败')
        return res.cc('删除成功', 0)
    })
}

exports.getCates = (req, res) => {
    const selSqlStr = 'select * from test_db.artcate where id=? and isdelete=0'
    db.query(selSqlStr, req.params.id, (err, result) => {
        if (err) return res.cc(err.message)
        if (result.length !== 1) return res.cc('无此分类')
        return res.send({
            status: 0,
            message: '查询成功',
            data: result
        })
    })
}

exports.updateCates = (req, res) => {
    const selSqlStr = 'select * from test_db.artcate where id<>? and (name=? or alias=?)'
    db.query(selSqlStr, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if(result.length === 2 || result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) return res.cc('名称与别名被占用，请更换后重试')
        if (result.length === 1) return res.cc('名称活别名被占用， 请更换后重试')
        const updateSqlStr = 'update test_db.artcate set ? where id=?'
        db.query(updateSqlStr, [req.body, req.body.id], (err, result) => {
            if (err) return res.cc(err.message)
            if (result.affectedRows !== 1) return res.cc('更新分类失败')
            return res.cc('更新分类成功', 0)
        })
    })
}